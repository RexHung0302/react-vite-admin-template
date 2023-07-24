import { useEffect, useState } from 'react';
import { LoadingOutlined, SyncOutlined } from '@ant-design/icons';
import moment from 'moment';

interface IProps {
  expirationTime: number;
  reminderTime?: number;
  reminderCallback?: (diffTime: number) => void;
  reminderCallbackReset?: () => void;
  endTimeCallback?: () => void;
  reloadTimeCallback?: () => void;
}

// 下註解
/**
 * @param {number} expirationTime 僅接受毫秒(Timestamp)
 * @param {number} reminderTime 小於時間提醒，僅接受毫秒(Timestamp)
 * @param {({diff}: {diff: number}) => void} reminderCallback 小於時間提醒的 callback
 * @param {() => void} reminderCallbackReset 小於時間提醒的 callback 重置
 * @param {() => void} endTimeCallback 倒數結束後的 callback
 * @param {() => void} reloadTimeCallback 重新計算時間的 callback
 * @returns {JSX.Element} 格式為 00:00:00 的 JSX
 */

const CountDown = ({
  expirationTime = moment().utc().valueOf(),
  // 預設一分鐘提醒
  reminderTime = 60000,
  reminderCallback,
  reminderCallbackReset,
  endTimeCallback,
  reloadTimeCallback,
}: IProps) => {
  const [loading, setLoading] = useState(true);
  const [diffTime, setDiffTime] = useState(0);

  useEffect(() => {
    setLoading(true);
    const interval = setInterval(() => {
      const diff = expirationTime - moment().utc().valueOf();
      setDiffTime(diff);

      if (reminderTime && diff <= reminderTime) {
        if (reminderCallback) reminderCallback(diff);
      }

      if (diff <= 0) {
        setDiffTime(0);
        clearInterval(interval);
        if (reminderCallbackReset) reminderCallbackReset();
        setLoading(false);

        if (endTimeCallback) endTimeCallback();
      }

      setLoading(false);
    }, 1000);

    return () => {
      setDiffTime(0);
      clearInterval(interval);
      if (reminderCallbackReset) reminderCallbackReset();
    };
  }, [expirationTime, reminderTime, reminderCallback, reminderCallbackReset, endTimeCallback]);

  return (
    <>
      {loading ? (
        <LoadingOutlined />
      ) : (
        <>
          {moment.utc(diffTime).format('HH:mm:ss')}
          {reloadTimeCallback && <SyncOutlined className='ml-2 text-green-800 hover:text-green-400 cursor-pointer ease-out duration-300 reload-icon' onClick={reloadTimeCallback} />}
        </>
      )}
    </>
  );
};

export default CountDown;
