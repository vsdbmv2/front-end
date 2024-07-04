import processWorker from "./process?worker&url";

export const availableMemory = () => (
  performance?.memory?.jsHeapSizeLimit - performance?.memory?.usedJSHeapSize
) / (1024 * 1024);

export const usedMemory = () => performance?.memory?.usedJSHeapSize / (1024 * 1024);

export const processWork = async (work, index=null) => new Promise((resolve, reject) => {
  const worker = new Worker(processWorker, {
    type: 'module',
    ...(index ? {name: `process-worker-${work.type}-${index}`} : {name: `process-worker-${work.type}`})
  });
  worker.onerror = (err) => {
    console.log("err", err);
    reject(err)
  }
  worker.onmessage = ({data}) => {
    console.log({data});
    if(data.message) return;
    worker.terminate();
    resolve(data);
  }
  worker.postMessage(work);
});