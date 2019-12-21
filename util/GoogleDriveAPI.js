const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { google } = require('googleapis');

const SCOPES = ['https://www.googleapis.com/auth/drive'];
const TOKEN_PATH = 'token.json';
const CREDENTIALS_PATH = 'credentials.json';
const ROOT_PATH = path.join(process.cwd(), '..');

const getAccessToken = (oAuth2Client, callback) => {
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) {
      const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES
      });
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
      console.log('Authorize this app by visiting this url:', authUrl);
      rl.question('Enter the code from that page here:', code => {
        rl.close();
        oAuth2Client.getToken(code, (err, token) => {
          if (err) {
            throw error('Error retrieving access token', err);
          }
          oAuth2Client.setCredentials(token);
          // 将token写入本地文件
          fs.writeFile(TOKEN_PATH, JSON.stringify(token), err => {
            if (err) {
              throw error('token写入失败', err);
            }
            console.log('Token stored to ', TOKEN_PATH);
          });
          callback(oAuth2Client);
        });
      });
    } else {
      oAuth2Client.setCredentials(JSON.parse(token.toString()));
      callback(oAuth2Client);
    }
  });
};

const downloadFiles = (drive, GDfiles = []) => {
  const getFile = (file, fileTemp) => {
    drive.files.get({
      fileId: file.id,
      alt: 'media'
    }, { responseType: 'stream' }, (fileErr, res) => {
      if (fileErr) {
        console.log('download failed ', file.name, fileErr);
      } else {
        res.data.on('end', () => {
          console.log(`${file.name} download successfully`);
        }).on('error', downloadErr => {
          console.log('download error', downloadErr, file.name);
        }).pipe(fileTemp);
      }
    });
  };

  fs.readdir(`${ROOT_PATH}/_files`, (err, files) => {
    if (err) {
      fs.mkdir(`${ROOT_PATH}/_files`, _err => {
        if (_err) {
          throw Error(`创建文件夹失败, ${_err}`);
        }
        GDfiles.map(file => {
          const fileTemp = fs.createWriteStream(`${ROOT_PATH}/_files/${file.name}`);
          getFile(file, fileTemp);
        });
      });
    } else {
      GDfiles.map(file => {
        const fileTemp = fs.createWriteStream(`${ROOT_PATH}/_files/${file.name}`);
        getFile(file, fileTemp);
      });
    }
  })
};

const listFiles = (auth, pageToken) => {
  console.log('pageToken', pageToken);
  const drive = google.drive({
    version: 'v3',
    auth
  });
  drive.files.list({
    pageSize: 10,
    q: "mimeType='text/markdown'",
    fields: 'nextPageToken, files(id, name)',
    spaces: 'drive',
    pageToken
  }, (err, res) => {
    const { data: { files, nextPageToken = null }} = res;
    if (err) {
      throw Error(`get files failed ${err} ${res}`);
    }
    downloadFiles(drive, files);
    pageToken = nextPageToken;
    if (pageToken) {
      listFiles(auth, pageToken)
    }
    console.log('after pageToken', pageToken);
  });
};

const authorize = (credentials, callback) => {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
  fs.readFile(`${ROOT_PATH}/${TOKEN_PATH}`, (err, token) => {
    if (err) {
      return getAccessToken(oAuth2Client, callback);
    }
    oAuth2Client.setCredentials(JSON.parse(token.toString()));
    callback(oAuth2Client);
  })
};

fs.readFile(`${ROOT_PATH}/${CREDENTIALS_PATH}`, (err, content) => {
  console.log('content', JSON.parse(content.toString()));
  authorize(JSON.parse(content.toString()), listFiles);
});

