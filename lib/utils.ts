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
const authorize = (credentials: any, callback?: any) => {
  // eslint-disable-next-line camelcase
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) {
      return getAccessToken(oAuth2Client, callback);
    }
    const tokenString = token.toString();
    oAuth2Client.setCredentials(JSON.parse(tokenString));
    if (callback) {
      callback(oAuth2Client);
    }
  });
};

const getFilesList = (auth: GoogleAuth | OAuth2Client | string, pageToken?: string) => {
  const drive = google.drive({
    version: 'v3',
    auth
  });
  // google drive api 的 pageSize 参数最大为1000
  // 目前直接全部请求
  // 是否有超时可能？
  // 超过1000的处理？
  // TODO
  drive.files.list({
    pageSize: 1000,
    q: "mimeType='text/markdown'",
    fields: 'nextPageToken, files(id, name, parents, modifiedTime)',
    corpora: 'user',
    pageToken
  }, async (err: any, res: any) => {
    const { data: { files, nextPageToken } } = res;
    console.log('data', res);
    if (err) {
      throw Error(`download files list failed ${err} ${res}`);
    }
    console.log('-------loading next page--------');
    console.log('nextPageToken', nextPageToken);
    await constructFolderStructure(drive, files);
    if (nextPageToken) {
      getFilesList(auth, nextPageToken);
    } else {
      createFolderDataStructure();
    }
  });
};

export const fetchFileContent = (id: string) => {
  return new Promise((resolve, reject) => {
    const credentials = path.resolve(ROOT_PATH, './credentials.json');
    fs.readFile(credentials, (err, content) => {
      if (err) {
        console.log('err', err);
      }
      authorize(JSON.parse(content.toString()), (auth: any) => {
        const drive = google.drive({
          version: 'v3',
          auth
        });
        // const contentChunk: string[] = [];
        // @ts-ignore
        drive.files.get({
          fileId: id
        }).then((res: any) => {
          if (res) {
            const { data: { name, modifiedTime } } = res;
            const contentChunk: string[] = [];
            drive.files.get({
              fileId: id,
              fields: 'title, modifiedTime',
              alt: 'media'
            }, {
              responseType: 'stream'
            }, (err, result) => {
              if (err) {
                console.log('error', err);
              } else if (result) {
                result.data.on('data', (chunk: any) => {
                  contentChunk.push(chunk);
                }).on('end', () => {
                  resolve({
                    content: contentChunk.toString(),
                    name: name,
                    modifiedTime
                  });
                });
              }
            });
          }
        });
      });
    });
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

initGooleDriverAuthor();
