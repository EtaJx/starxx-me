const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { google } = require('googleapis');

const SCOPES = ['https://www.googleapis.com/auth/drive'];
const TOKEN_PATH = '/lib/token.json';
const CREDENTIALS_PATH = '/credentials.json';
const DATA_PATH = 'data.json';
const ROOT_PATH = path.join(process.cwd(), './');
const FOLDERS_MAP = new Map();

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
          fs.writeFile(ROOT_PATH + TOKEN_PATH, JSON.stringify(token), err => {
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

const constructFolderStructure = async (drive, files = []) => {
  for (const file of files) {
    const { parents = []} = file;
    if (parents[0] && !FOLDERS_MAP.has(parents[0])) {
      const fetchFolderName = async () => {
        const res = await drive.files.get({
          fileId: parents[0]
        })
        const { data: { name } } = res;
        return name;
      }
      const folderName = await fetchFolderName();
      FOLDERS_MAP.set(parents[0], {
        folderName,
        id: parents[0],
        files: [file]
      });
    } else {
      const { folderName, files: tempFiles = [] } = FOLDERS_MAP.get(parents[0]);
      FOLDERS_MAP.set(parents[0], {
        folderName,
        files: [...tempFiles, file]
      });
    }
  }
}

const createFolderDataStructure = () => {
  const filesFromMap = Array.from(FOLDERS_MAP);
  fs.writeFile(DATA_PATH, JSON.stringify(filesFromMap), err => {
    if (err) {
      throw err;
    }
    console.log('files 写入成功');
  })

}

// 递归下载所有文件
// 文件过多的风险？
// 先忽略不计
const listFiles = (auth, pageToken) => {
  const drive = google.drive({
    version: 'v3',
    auth
  });
  drive.files.list({
    pageSize: 10,
    q: "mimeType='text/markdown'", // mimeType = 'application/vnd.google-apps.folder'
    fields: "nextPageToken, files(id, name, parents, modifiedTime)",
    corpora: 'user',
    pageToken
  }, async (err, res) => {
    const { data: { files, nextPageToken = null }} = res;
    if (err) {
      throw Error(`download file failed ${err} ${res}`);
    }
    console.log('--------------');
    await constructFolderStructure(drive, files);
    pageToken = nextPageToken;
    if (pageToken) {
      listFiles(auth, pageToken)
    } else {
      createFolderDataStructure();
    }
  });
};

const authorize = (credentials, callback) => {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
  return new Promise((resolve, reject) => {
    fs.readFile(`${ROOT_PATH}/${TOKEN_PATH}`, (err, token) => {
      if (err) {
        return getAccessToken(oAuth2Client, callback);
      }
      oAuth2Client.setCredentials(JSON.parse(token.toString()));
      callback && callback(oAuth2Client);
      resolve(oAuth2Client);
    });
  })
};

const fetchFileContent = id => {
  return new Promise(async (resolve, reject) => {
    const credentials = require('../credentials.json');
    const auth = await authorize(credentials);
    const drive = google.drive({version: 'v3', auth});
    const contentChunk = [];
    const { data: { name, modifiedTime } } = await drive.files.get({
      fileId: id
    });
    drive.files.get({
      fileId: id,
      fields: 'title, modifiedTime',
      alt: 'media'
    }, {responseType: 'stream'}, (fileErr, res) => {
      if (fileErr) {
      } else {
        res.data.on('data', chunk => {
          contentChunk.push(chunk);
        }).on('end', () => {
          resolve({
            content: contentChunk.toString(),
            name: name,
            modifiedTime
          });
        }).on('error', downloadErr => {
          reject(downloadErr);
        });
      }
    })
  });
};


const initGD = () => {
  return new Promise((resolve ,reject) => {
    fs.readFile(`${ROOT_PATH}/${CREDENTIALS_PATH}`, async (err, content) => {
      console.log('root', ROOT_PATH, CREDENTIALS_PATH);
      await authorize(JSON.parse(content.toString()), listFiles);
      resolve();
    });
  })
}

module.exports = {
  fetchFileContent,
  initGD
}
