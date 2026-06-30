import { Col, Row } from 'antd';
import { DateTime } from 'luxon';
import React, { FC } from 'react';
import { dateFormat } from '../../Pages/Common/configs';
import './info.view.scss';

export interface InfoViewProps {
  data: any;
  title: any;
  icon: any;
  hiddenColumns?: any;
}

const InfoView: FC<InfoViewProps> = ({ title, data, icon, hiddenColumns = [] }) => {
  return (
    <div className="info-view">
      <div className="title">
        <span className="title-icon">{icon}</span>
        <span className="title-text">{title}</span>
      </div>
      <div>
        {Object.keys(data).map((k: any) => {
          if (hiddenColumns.indexOf(k) < 0) {
            return (
              <Row className="field" key={k}>
                <Col span={12} className="field-key">
                  {k}
                </Col>
                <Col span={12} className="field-value">
                  {data[k] instanceof DateTime
                    ? data[k].toFormat(dateFormat)
                    : data[k] === '' || !data[k] || data[k] === 'NaN'
                    ? '-'
                    : data[k]}
                </Col>
              </Row>
            );
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
};

export default InfoView;
