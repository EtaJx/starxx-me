import * as fs from 'fs';
import * as readline from 'readline';
import * as path from 'path';
import { google } from 'googleapis';
import { GoogleAuth, OAuth2Client } from 'google-auth-library';
import { GetTokenResponse } from 'google-auth-library/build/src/auth/oauth2client';

const SCOPES = ['https://www.googleapis.com/auth/drive'];
const TOKEN_PATH = 'token.json';
const DATA_PATH = 'data.json';
const ROOT_PATH = process.cwd();
const FOLDERS_MAP = new Map();

const constructFolderStructure = async (drive: any, files = []) => {
  for (const file of files) {
    const { parents = [] } = file;
    if (parents[0] && !FOLDERS_MAP.has(parents[0])) {
      const fetchFolderName = async () => {
        const res = await drive.files.get({
          fileId: parents[0]
        });
        const { data: { name } } = res;
        return name;
      };
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
};

const createFolderDataStructure = () => {
  const filesFromMap = Array.from(FOLDERS_MAP);
  fs.writeFile(DATA_PATH, JSON.stringify(filesFromMap), err => {
    if (err) {
      throw err;
    }
    console.log('files read complete!');
  });
};

const getAccessToken = (oAuth2Client: OAuth2Client, callback: any) => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });
  console.log('Authorize this app bu visition this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question('Enter the code from that page here: ', (code: string) => {
    rl.close();
    oAuth2Client.getToken(code).then((tokenResule: GetTokenResponse) => {
      const { tokens } = tokenResule;
      oAuth2Client.setCredentials(tokens);
      fs.writeFile(TOKEN_PATH, JSON.stringify(tokens), (err) => {
        if (err) {
          return console.error(err);
        }
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
};

/**
 * 开始认证
 * @param credentials
 * @param callback
 */
const authorize = (credentials: any, callback: any) => {
  // eslint-disable-next-line camelcase
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) {
      return getAccessToken(oAuth2Client, callback);
    }
    const tokenString = token.toString();
    oAuth2Client.setCredentials(JSON.parse(tokenString));
    callback(oAuth2Client);
  });
};

const getFilesList = (auth: GoogleAuth | OAuth2Client | string, pageToken?: string) => {
  const drive = google.drive({
    version: 'v3',
    auth
  });
  drive.files.list({
    pageSize: 15,
    q: "mimeType='text/markdown'",
    fields: 'nextPageToken, files(id, name, parents, modifiedTime)',
    corpora: 'user',
    pageToken
  }, async (err: any, res: any) => {
    const { data: { files, nextPageToken } } = res;
    if (err) {
      throw Error(`download files list failed ${err} ${res}`);
    }
    console.log('-------loading next page--------');
    await constructFolderStructure(drive, files);
    if (nextPageToken) {
      getFilesList(auth, nextPageToken);
    } else {
      createFolderDataStructure();
    }
  });
};

/**
 * 初始化GoogleDriveAPI
 */
export const initGooleDriverAuthor = () => {
  const credentials = path.resolve(ROOT_PATH, './credentials.json');
  // 读取本地credentials文件
  fs.readFile(credentials, (err, content) => {
    if (err) {
      console.log('error', err);
      throw Error('make sure you have credentials.json');
    }
    const contentString = content.toString();
    authorize(JSON.parse(contentString), getFilesList);
  });
};
