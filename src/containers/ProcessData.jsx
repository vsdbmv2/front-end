import React, { useEffect, useState, createRef } from 'react';
import { Container, Card, FormCheck  } from 'react-bootstrap';
import FormRange from 'react-bootstrap/FormRange'
import PageHeader from '../components/PageTitle';

import styled from 'styled-components';
import colors from '../static/colors.js';
import {client} from '../services/socket.js';

import processWorker from '../services/process?worker';

import {process} from '../services/work';

export default function ProcessData() {
  const webWorkersEnabled = !!window.Worker;
  const [toggleProcess, setToggleProcess] = useState(true);
  const [worksAmount, setWorksAmount] = useState(4);
  const [currentWorks, setCurrentWorks] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [results, setResults] = useState([]);

  const attributeWorks = works => {
    if(webWorkersEnabled){
      setCurrentWorks(works);
      setWorkers(Array(works.length).fill(
        new processWorker()
      ));
    }else{
      // demanda na thread principal
      setResults(works.map((work, index) => process({...work, index})));
    }
  };
  const onPing = () => {
    if(!toggleProcess || currentWorks.length) return;
    client.emit('get-work', {worksAmount});
  }

  useEffect(() => {
    if(!results.length) return;
    workers.forEach((worker) =>{
      worker.terminate();
    })
    client.emit('work-complete', results);
    setWorkers([]);
    setResults([]);
    setCurrentWorks([]);
  }, [results])
  

  useEffect(() => {
    client.connect();
    return () => {
      client.disconnect();
      delete window.functions;
    }
  }, [])

  useEffect(() => {
    client.on('ping', onPing)
    client.on('work', attributeWorks)
    console.log({socket: client})
    return () => {
      client.off('ping', onPing);
      client.off('work', attributeWorks);
    }
  }, [currentWorks])

  const executeWorks = async () => {
    const processWorks = new Promise((resolve) => {
    let done = [];
    workers.map((worker, index) => {
      console.log(`attributing index ${index}`)
        worker.onmessage = ({data}) => {
          done.push(data);
          console.log('finalizou o work', data)
          if(done.length === currentWorks.length) resolve(done);
        }
        worker.postMessage({...currentWorks[index], index});
      })
    })
  const results = await processWorks;
  console.log('promises finalizadas');
  setResults(results);
  }

  useEffect(() => {
    if(!currentWorks.length || !workers.length) return;
    // demanda os works;
    executeWorks()
    
  }, [currentWorks, workers]);

  const getWorkLabel = (type) => {
    if(type === 'local-mapping') return 'sequence subtype'
    if(type === 'global-mapping') return 'sequence global alignment'
    if(type === 'epitope-mapping') return 'epitope'
  }

  return (
    <Container className="mb-5 my-5">
      <PageHeader text="VSDBM - Viral Sequence Database Manager" />
      <BlackCard>
        <Card.Header className="title-box">
          <CardTitle>
            <span>Process data</span>
            <span>
              {!toggleProcess ? 'Enable' : 'Disable'} process
              <FormCheck
            value={toggleProcess}
            onChange={(e) => setToggleProcess(e.target.checked)}
            />
          </span>
            </CardTitle>
        </Card.Header>
        <Card.Body style={{color: 'white'}}>
          <h3>Connection status:</h3>
          <ul>
            <li>connected: {client.connected ? 'yes' : 'no'}</li>
            <li>latency: <PingSpan client={client} /></li>
            <li>works per time: {worksAmount} </li>
            <li>
              <FormRange
              style={{width: 120}}
              value={worksAmount}
              onChange={(e) => setWorksAmount(e.target.value)}
              min={1}
              max={8}
              />
              </li>
              {
              currentWorks?.map((work, index) => 
              <li key={work.identifier}>Worker #{index+1} - Mapping {getWorkLabel(work.type)}</li>)
              }
          </ul>
        </Card.Body>
      </BlackCard>
    </Container>
  )
}

const PingSpan = ({client}) => {
  const [latency, setLatency] = useState(0);
  useEffect(() => {
    client.on('ping', (data) => {
      const now = new Date().getTime();
      setLatency(now - data.startTime);
    });
    return () => {
      client.off('ping');
    }
  }, []);
  return <span>{latency} {latency < 51 ? 'good' : latency < 301 ? 'ok' : 'bad'}</span>
}


const BlackCard = styled(Card)`
  background-color: ${colors.color7};
`;

const CardTitle = styled.h2`
  color: ${colors.color2};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  > span {
    display: flex;
    flex-direction: row;
    gap: 24px;
  }
`;