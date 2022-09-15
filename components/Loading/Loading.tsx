import style from './Loading.module.css';
import loadingImg from '@/public/loading.svg';
const Loading = () => {
  return (
    <div className={style.loading}>
      <img src={loadingImg.src} className={style['loading-icon']} />
    </div>
  );
};

export default Loading;
