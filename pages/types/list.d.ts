// 单个文件描述
export interface file {
  id: string,
  modifiedTime: string,
  name: string
  parents: parentId[]
}

// 文件父文件夹id
export type parentId = string[]

// files
export type files = file[]

// 文件夹名称
export type folderName = string

export interface folderIncludeFiles {
  files: files,
  folderName: folderName
}

// 文件夹结构
export type folderStruct = (folderIncludeFiles | string)[]

// 复合文件夹结构
export type folderStructs = folderStruct[]
