export type Folder = {
  id: string,
  folderName: string
  files: File[]
  isOpen: boolean
}

export type File = {
  id: string,
  modifiedTime: Date,
  name: string
}
