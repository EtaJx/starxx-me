type NavsConfig = {
  label: string,
  link: string,
  key: string
}
export const navs: NavsConfig[] =  [
  {
    label: '首页',
    link: '/',
    key: 'article'
  },
  // {
  //   label: '分类',
  //   link: '/category',
  //   key: 'category'
  // },
  {
    label: '关于我',
    link: '/about',
    key: 'about'
  }
]
