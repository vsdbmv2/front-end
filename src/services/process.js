import {process} from './work';

onmessage = (work) => {
  const payload = process(work.data);
  postMessage({payload, identifier: work.data.identifier, type: work.data.type});
}

export {}
