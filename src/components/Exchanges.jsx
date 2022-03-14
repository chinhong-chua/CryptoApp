import { skipToken } from "@reduxjs/toolkit/dist/query";
import millify from "millify";
import { Col, Collapse, Row, Typography, Avatar } from "antd";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import HTMLReactParser from "html-react-parser";
import {
  useGetCryptoExchangesQuery,
  useGetCryptosQuery,
} from "../services/cryptoApi";
import Loader from "./Loader";

const { Panel } = Collapse;
const { Text } = Typography;

const Exchanges = () => {
  // const [skip, setSkip] = useState(true);
  const { data: coinData, isCoinFetching } = useGetCryptosQuery(5);
  const coindId = coinData?.data?.coins?.[0].uuid;

  const { data: exchangesData, isFetching } = useGetCryptoExchangesQuery(
    coinData?.data?.coins?.[0].uuid,
    { skip: coindId === undefined || coindId === null }
  );
  if (isFetching) return <Loader />;

  // console.log(exchangesData);
  // console.log("exchangesData: ", exchangesData);
  // {
  //   pollingInterval: 3000,
  //   refetchOnMountOrArgChange: true,

  //   skip: !coinFetching,
  // }

  //   const { data: user, isFulfilled: userFulfilled } = useGetUserQuery();
  // const { data: userBio} = useGetUserBioQuery(userFulfilled ? user.id : skipToken);

  // console.log(
  //   " coinData?.data?.coins?.[0].uuid",
  //   coinData?.data?.coins?.[0].uuid
  // );

  // const exchangesList = data?.data?.exchanges;

  // useEffect(()=> {
  //   const { data, isFetching } =  useGetCryptoExchangesQuery(coinId) ;
  // },[coinId])
  // Note: To access this endpoint you need premium plan
  // if (isFetching) return <Loader />;

  return (
    <>
      <Row>
        <Col span={6}>Exchanges</Col>
        <Col span={6}>24h Trade Volume</Col>
        <Col span={6}>Markets</Col>
        <Col span={6}>Ranking</Col>
      </Row>
      <Row>
        {exchangesData?.data?.exchanges.map((exchange, i) => (
          <Col span={24} key={i}>
            <Collapse>
              <Panel
                key={exchange.uuid}
                showArrow={false}
                header={
                  <>
                    <Col span={6}>
                      <Text>
                        <strong>{i + 1}.</strong>
                      </Text>
                      <Avatar
                        className="exchange-image"
                        src={exchange.iconUrl}
                      />
                      <Text>
                        <strong>{exchange.name}</strong>
                      </Text>
                    </Col>
                    <Col span={6}>${millify(exchange["24hVolume"])}</Col>
                    <Col span={6}>{millify(exchange.numberOfMarkets)}</Col>
                    <Col span={6}>&nbsp;&nbsp;{exchange.rank}</Col>
                  </>
                }
              >
                <a
                  href={exchange.coinrankingUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  {exchange.coinrankingUrl}
                </a>
                {/* {HTMLReactParser(
                  (
             
                  ) 
                  || ""
                )} */}
              </Panel>
            </Collapse>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Exchanges;
