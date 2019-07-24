import React, { Fragment } from 'react';
import { Layout, Icon } from 'antd';
import GlobalFooter from '@/components/GlobalFooter';
import { formatMessage } from 'umi-plugin-react/locale';

const { Footer } = Layout;
const FooterView = () => (
  <Footer style={{ padding: 0 }}>
    <GlobalFooter
      links={[
        {
          key: '洲博通 官网',
          title: '洲博通 官网',
          href: 'https://www.zbtservices.com/',
          blankTarget: true,
        },
        {
          key: 'apple',
          title: <Icon type="apple" spin theme="filled"/>,
          href: 'https://www.zbtservices.com/',
          blankTarget: true,
        },
        {
          key: '洲博通 外综',
          title: '洲博通 外综',
          href: 'http://www.vmaotong.com:8083',
          blankTarget: true,
        },
      ]}
      copyright={
        <Fragment>
          Copyright <Icon type="copyright"/> {formatMessage({ id: 'layout.user.link.copyright' })}
        </Fragment>
      }
    />
  </Footer>
);
export default FooterView;
