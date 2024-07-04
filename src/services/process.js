import {process} from './work';

onmessage = (work) => {
  console.log('web worker process')
  const timeoutCheck = setTimeout(function(){
    postMessage({message: 'timeout', timeout: true});
    throw new Error('timeout');
  }, 30 * 1000);
  const payload = process(work.data);
  clearTimeout(timeoutCheck);
  postMessage({payload, identifier: work.data.identifier, type: work.data.type});
  close();
}

export {}
