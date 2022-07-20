import * as fs from 'fs';
import * as readline from 'readline';
import * as path from 'path';
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import { GetTokenResponse } from 'google-auth-library/build/src/auth/oauth2client';

const SCOPES = ['https://www.googleapis.com/auth/drive'];
const TOKEN_PATH = 'token.json';
const DATA_PATH = path.resolve(process.cwd(), './data.json');
const ROOT_PATH = process.cwd();
const FOLDERS_MAP = new Map();

export const clearDataMap = () => {
  FOLDERS_MAP.clear();
};

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
  return new Promise((resolve: any) => {
    const filesFromMap = Array.from(FOLDERS_MAP);
    /**
     * before write file, clear old data file
     */
    clearDataMap();
    fs.writeFile(DATA_PATH, JSON.stringify(filesFromMap), err => {
      if (err) {
        throw err;
      }
      console.log('files read complete!');
      resolve(true);
    });
  });
};

const getFilesList = (auth: OAuth2Client, pageToken?: string) => {
  const drive = google.drive({
    version: 'v3',
    auth
  });
  return new Promise((resolve: any) => {
    // google drive api 的 pageSize 参数最大为1000
    drive.files.list({
      pageSize: 20,
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
      console.log('-----nextPageToken', nextPageToken);
      if (nextPageToken) {
        await getFilesList(auth, nextPageToken);
      } else {
        const createFolderDataResult = await createFolderDataStructure();
        resolve(createFolderDataResult);
      }
    });
  });
};

const getAccessToken = (oAuth2Client: OAuth2Client) => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });
  console.log('Authorize this app by visit this url:', authUrl);
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
      // 获取AccessToken之后手动执行getFileList
      getFilesList(oAuth2Client);
    });
  });
};

/**
 * 开始认证
 * @param credentials
 */
const authorize = (credentials: any): Promise<OAuth2Client> => {
  return new Promise((resolve: any) => {
    // eslint-disable-next-line camelcase
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    // eslint-disable-next-line camelcase
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
    fs.readFile(TOKEN_PATH, (err, token) => {
      if (err) {
        return getAccessToken(oAuth2Client);
      }
      const tokenString = token.toString();
      oAuth2Client.setCredentials(JSON.parse(tokenString));
      resolve(oAuth2Client);
    });
  });
};

export const fetchFileContent = (id: string) => {
  return new Promise((resolve, reject) => {
    const credentials = path.resolve(ROOT_PATH, './credentials.json');
    fs.readFile(credentials, (err, content) => {
      if (err) {
        console.log('err', err);
      }
      authorize(JSON.parse(content.toString())).then((auth: OAuth2Client) => {
        const drive = google.drive({
          version: 'v3',
          auth
        });
        // const contentChunk: string[] = [];
        drive.files.get({
          fileId: id,
          fields: 'id, name, mimeType, modifiedTime'
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
                throw err;
              } else if (result) {
                result.data.on('data', (chunk: string) => {
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
export const initGooleDriverAuthor = (): Promise<Buffer | []> => {
  return new Promise((resolve: any) => {
    const credentials = path.resolve(ROOT_PATH, './credentials.json');
    // 读取本地credentials文件
    fs.readFile(credentials, (err: Error | null, content: Buffer) => {
      if (err) {
        console.log('error', err);
        throw Error('make sure you have credentials.json');
      }
      const contentString = content.toString();
      authorize(JSON.parse(contentString)).then(async (auth: OAuth2Client) => {
        const result = await getFilesList(auth);
        if (result) {
          fs.readFile('./data.json', (err: Error | null, content: Buffer) => {
            if (err) {
              resolve([]);
            }
            resolve(content);
          });
        }
      });
    });
  });
};
