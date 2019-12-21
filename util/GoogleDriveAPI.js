const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { google } = require('googleapis');

const SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly'];
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
    }

    oAuth2Client.setCredentials(JSON.parse(token.toString()));
    callback(oAuth2Client);
  });
};

const listFiles = auth => {
  const drive = google.drive({
    version: 'v3',
    auth
  });
  // drive.files.list({
  //   q: "mimeType='application/vnd.google-apps.folder'",
  //   fields: 'nextPageToken, files(id, name)',
  //   spaces: 'drive',
  //   pageToken: null
  // }, (err, res) => {
  //   if (err) {
  //     throw error('get folders fialed', err);
  //   }
  //   res.data.files.map(folder => console.log('folder', folder.name));
  // });
  drive.files.list({
    pageSize: 30,
    fields: 'nextPageToken, files(id, name)'
  }, (err, res) => {
    if (err) {
      throw Error('The API returned an error: ', + err);
    }
    const files = res.data.files;
    console.log(Object.keys(res.data));
    console.log('Files:');
    if (files.length) {
      files.map(file => {
        drive.files.get({fileId: file.id}).then(res => {
          console.log('res', res.data);
        })
      });
      // files.map(file => console.log(file.name));
    } else {
      console.log('There is no file');
    }
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

