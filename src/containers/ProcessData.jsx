import React, { useEffect, useState, createRef } from "react";
import { Container, Card, FormCheck } from "react-bootstrap";
import FormRange from "react-bootstrap/FormRange";
import PageHeader from "../components/PageTitle";

import styled from "styled-components";
import colors from "../static/colors.js";
import { client } from "../services/socket.js";

import processWorker from "../services/process?worker&url";

import { process } from "../services/work";
import { processWork, usedMemory } from "../services/utils.js";

export default function ProcessData() {
  const webWorkersEnabled = !!window.Worker;
  const [toggleProcess, setToggleProcess] = useState(true);
  const [worksAmount, setWorksAmount] = useState(
    // (navigator?.hardwareConcurrency ?? 8) * 2
    4
  );
  const [clients, setClients] = useState(0);
  const [currentWorks, setCurrentWorks] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [results, setResults] = useState([]);
  const [eta, setEta] = useState(0);
  const [processed, setProcessed] = useState(null);

  const attributeWorks = (works) => {
    if (webWorkersEnabled) {
      setCurrentWorks(works);
      // setWorkers(Array(works.length).fill(new Worker(processWorker, { type: 'module' })));
    } else {
      // demanda na thread principal
      let start = performance.now();
      setEta(performance.now() - start);
      let localResults = [];
      works.forEach((work, index) => {
        console.log(`processing ${index+1} of ${works.length}`, {work});
        localResults.push(process({...work, index}))
      });
      setResults(localResults);
      setCurrentWorks([]);
      // setResults(works.map((work, index) => process({ ...work, index })));
      console.log(
        new Date().toLocaleTimeString(),
        "finalizado trabalho na main thread"
      );
    }
  };
  const onPing = (data) => {
    client.emit("pong", {
      // startTime: data.startTime,
      ...(data.server_ts ? { server_ts: data.server_ts } : {}),
      ...(data.server_ack_ts ? { server_ack_ts: data.server_ack_ts } : {}),
      client_ts: performance.now(),
    });
    setClients(toggleProcess ? data.clients : data.clients - 1);
    if (!results.length && !currentWorks.length) return;
    client.emit("get-work", { worksAmount });
  };

  const onConnect = () => {
    client.emit("get-work", { worksAmount });
  };

  useEffect(() => {
    console.log({results})
    if (!results.length) return;
    setProcessed((prevState) =>
      results.reduce(
        (acc, curr) => ({ ...acc, [curr.type]: acc[curr.type] + 1 }),
        prevState
      )
    );
    client.emit("work-complete", results);
    setResults([]);
  }, [results]);

  useEffect(() => {
    if (!processed) return;
    window.localStorage.setItem("processed-data", JSON.stringify(processed));
  }, [processed]);

  useEffect(() => {
    client.connect();
    const processedLocalStorage = window.localStorage.getItem("processed-data");
    if (!processed && processedLocalStorage) {
      setProcessed(JSON.parse(processedLocalStorage));
    } else if (!processed) {
      setProcessed({
        "local-mapping": 0,
        "global-mapping": 0,
        "epitope-mapping": 0,
      });
    }
    return () => client.disconnect();
  }, []);

  useEffect(() => {
    client.on("connect", onConnect);
    client.on("ping", onPing);
    client.on("work", attributeWorks);
    return () => {
      client.off("connect", onConnect);
      client.off("ping", onPing);
      client.off("work", attributeWorks);
    };
  }, [currentWorks]);
  
  const executeWorks = async () => {
    let start = performance.now();
    console.log('usedMemory before', usedMemory());
    // const processWorks = new Promise((resolve) => {
    //   let done = [];
    //   let finishedAmount = 0;
    //   const createdWorkers = workers.map((worker, index) => {
    //     const start = performance.now();
    //     // console.log(`attributing index ${index}`)
    //     worker.onmessage = ({ data }) => {
    //       finishedAmount++;
    //       done.push(data);
    //       console.log(
    //         `finalizou o work ${finishedAmount} de ${workers.length} em ${
    //           performance.now() - start
    //         } ms`
    //       );
    //       if (done.length !== currentWorks.length) return
    //       resolve(done);
    //       clearTimeout(follow);
    //     };
    //     worker.onerror = (err) => console.log("err", err);
    //     worker.postMessage({ ...currentWorks[index], index });
    //     return worker
    //   });

    //   const follow = setTimeout(() => {
    //     console.log({done, createdWorkers});
    //   }, 30 * 1000);
    // });

    //  ----------------------------------------------------------------
    // const processWorks = new Promise((resolve) => {
    //   let finishedAmount = 0;
    //   let done = [];
    //   const worker = new Worker(processWorker, { type: 'module'});
    //   worker.onerror = (err) => console.log("err", err);
    //   worker.onmessage = ({data}) => {
    //     console.log({data})
    //     if(data.message) return;
    //     finishedAmount++;
    //     done.push(data);
    //     console.log(
    //       `finalizou o work ${finishedAmount} de ${currentWorks.length} em ${
    //         performance.now() - start
    //       } ms`
    //     );
    //     if (done.length !== currentWorks.length) return
    //     worker.terminate();
    //     resolve(done);
    //   }
    //   currentWorks.forEach((work, index) => {
    //     console.log('work', index)
    //     worker.postMessage({...work, index});
    //   });
    // })

    // ----------------------------------------------------------------
    let results = [];
    // currentWorks.forEach((work, index) => {
    //   try {
    //     console.log('work', index)
    //     results.push(processWork(work, index+1));
    //   } catch (error) {
    //     console.log({error, work, index});
    //   }
    // });
    for (const [index, work] of currentWorks.entries()) {
      console.log(`processing ${work.type} ${index+1}`)
      const result = await processWork(work, index+1);
      console.log(`finished ${work.type} ${index+1}`)
      results.push(result);
    }
    console.log({results, currentWorks}, 'before')
    // results = await Promise.all(results);
    console.log({results, currentWorks}, 'after')
    console.log('usedMemory after', usedMemory());
    const finish = performance.now();
    console.log(new Date().toLocaleTimeString(), "promises finalizadas");
    console.log({results})
    setResults(results);
    for (const worker of workers) worker.terminate();
    setWorkers([]);
    setCurrentWorks([]);
    setEta(finish - start);
  };

  useEffect(() => {
    if (!currentWorks.length) return;
    // if(!workers.length) return;
    // demanda os works;
    executeWorks();
  }, [currentWorks, workers]);

  const getWorkLabel = (type) => {
    if (type === "local-mapping") return "sequence subtype";
    if (type === "global-mapping") return "sequence global alignment";
    if (type === "epitope-mapping") return "epitope";
  };

  return (
    <Container className="mb-5 my-5">
      <PageHeader text="VSDBM - Viral Sequence Database Manager" />
      <BlackCard>
        <Card.Header className="title-box">
          <CardTitle>
            <span>Process data</span>
            {import.meta.env.VITE_DISABLE_PROCESS !== "true" ? (
              <span>
                {!toggleProcess ? "Enable" : "Disable"} process
                <FormCheck
                  value={toggleProcess}
                  onChange={(e) => setToggleProcess(e.target.checked)}
                />
              </span>
            ) : (
              <></>
            )}
          </CardTitle>
        </Card.Header>
        <Card.Body style={{ color: "white" }}>
          <h3>Connection status:</h3>
          <ul>
            <li>Connected clients: {clients}</li>
            <li>
              latency: <PingSpan client={client} />
            </li>
            <li>works per time: {worksAmount} </li>
            <li style={{ position: "relative" }}>
              <FormRange
                style={{ width: "100%" }}
                value={worksAmount}
                onChange={(e) => setWorksAmount(e.target.value)}
                min={1}
                max={(navigator?.hardwareConcurrency ?? 8) * 4}
              />
              <label htmlFor="range">{1}</label>
              <label
                htmlFor="range"
                style={{
                  position: "absolute",
                  left: `calc(${
                    worksAmount / ((navigator?.hardwareConcurrency ?? 8) * 4)
                  } * 100%)`,
                  transform: "translate(-100%)",
                }}
              >
                {worksAmount}
              </label>
              <label htmlFor="range" style={{ float: "right" }}>
                {(navigator?.hardwareConcurrency ?? 8) * 4}
              </label>
            </li>
            <hr />
            <li>running now {currentWorks.length} works</li>
            <li>
              Elapsed time from last work force: {(eta / 1000).toFixed(3)}{" "}
              seconds
            </li>
            <hr />
            <li>Thank you for your computational effort, you already did:</li>
            <li>Global alignment: {processed?.["global-mapping"]}</li>
            <li>Subtyping: {processed?.["local-mapping"]}</li>
            <li>Epitope maps: {processed?.["epitope-mapping"]}</li>
            <hr />
            {/* {currentWorks?.map((work, index) => (
              <li key={work.identifier}>
                Worker #{index + 1} - Mapping {getWorkLabel(work.type)}
              </li>
            ))} */}
          </ul>
        </Card.Body>
      </BlackCard>
    </Container>
  );
}

const PingSpan = ({ client }) => {
  const [latency, setLatency] = useState(0);
  const [problem, setProblem] = useState(0);
  useEffect(() => {
    client.on("ping", (data) => {
      if (data.client_ts && data.server_ack_ts) {
        const { server_ts, server_ack_ts, client_ts } = data;
        const client_ack_ts = performance.now();
        const currentPing = Math.abs(
          Math.round(
            server_ack_ts - server_ts - (client_ack_ts - client_ts) / 2
          )
        );
        if (Math.abs(latency - currentPing) < latency * 0.2) return;
        setLatency(currentPing);
      }
      // if (data.ping){
      //   setLatency(data.ping);
      //   setProblem(data.ping > 300);
      // }
      // const now = new Date().getTime();
      // setLatency(Math.abs(now - data.startTime));
      // if((now - data.startTime) < 0) setProblem(1)
    });
    return () => {
      client.off("ping");
    };
  }, []);
  return (
    <>
      <span>
        {latency}ms{" "}
        {latency < 51 ? "🚀 good" : latency < 301 ? "🙏 ok" : "🙅‍♂️ bad"}
      </span>
      {problem ? (
        <>
          <br />
          <small style={{ color: "#FDFD96" }}>
            we may have a problem to evaluate your ping (try updating your
            operational system clock)
          </small>
        </>
      ) : (
        ""
      )}
    </>
  );
};

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
