import React, { Component } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import Link from 'umi/link';
import { Checkbox, Alert, Icon } from 'antd';
import Login from '@/components/Login';
import styles from './Login.less';
import { Form } from 'antd';
import request from '../../utils/kim.request';
import {apiPath, mockiMitateData } from '../../../config/web.domain.config';



const { Tab, UserName, Password, Mobile, Captcha, Submit } = Login;

@Form.create()
@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
}))
class LoginPage extends Component {
  state = {
    type: 'account',
    autoLogin: true,
  };




  async componentDidMount() {
    document.addEventListener('scroll', this.handScroll, { passive: true });
  }

  componentWillMount() {
    this.setState({
      _passHasFeedbackFlag: true, //密码处 控制要不要反馈标记
      _userHasFeedbackFlag: true, //用户处 控制要不要反馈标记
    });
  }

  onTabChange = type => {
    this.setState({ type });
  };


  onGetCaptcha = () =>
    new Promise((resolve, reject) => {
      this.loginForm.validateFields(['mobile'], {}, (err, values) => {
        if (err) {
          reject(err);
        } else {
          const { dispatch } = this.props;
          dispatch({
            type: 'login/getCaptcha',
            payload: values.mobile,
          })
            .then(resolve)
            .catch(reject);
        }
      });
    });

  handleSubmit = (err, values) => {
    const { type } = this.state;
    if (!err) {
      this.props.dispatch({
        type: 'login/login',
        payload: {
          ...values,
          type,
          token: Date.now(),
        },
      });
    }
  };

  changeAutoLogin = e => {
    this.setState({
      autoLogin: e.target.checked,
    });
  };

  renderMessage = content => (
    <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon/>
  );


  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    console.log(value);
    if (value && value !== form.getFieldValue('loginId')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  render() {
    const { login, submitting } = this.props;
    const { type, autoLogin } = this.state;
    return (
      <div className={styles.main}>
        <Login
          defaultActiveKey={type}
          onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
          ref={form => {
            this.loginForm = form;
          }}
        >

          <Tab key="account" tab={formatMessage({ id: 'app.login.tab-login-credentials' })}>
            {login.status === 'error' &&
            login.type === 'account' &&
            !submitting &&
            this.renderMessage(formatMessage({ id: 'app.login.message-invalid-credentials' }))}

            <UserName
              name="loginId"
              placeholder={`${formatMessage({ id: 'app.login.userName' })}`}
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'validation.userName.required' }),
                },
                {
                  whitespace: true,
                  message: '用户名不能为空',
                },
              ]}
              _hasFeedbackFlag={this.state._userHasFeedbackFlag}
            />

            <Password
              name="password"
              placeholder={`${formatMessage({ id: 'app.login.password' })}`}
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'validation.password.required' }),
                },
                {
                  min: 4, max: 16,
                  message: '长度不在范围内',
                },
                {
                  whitespace: true,
                  message: '用户名必须为字母或者数字',
                },
                {
                  pattern: new RegExp('^\\w+$', 'g'),
                  message: '用户名必须为字母或者数字',
                },
                // {
                //   validator: this.compareToFirstPassword,  //自定义
                // },
              ]}
              onPressEnter={e => {
                e.preventDefault();
                this.loginForm.validateFields(this.handleSubmit);
              }}
              _hasFeedbackFlag={this.state._passHasFeedbackFlag}
            />
          </Tab>


          <Tab key="mobile" tab={formatMessage({ id: 'app.login.tab-login-mobile' })}>
            {login.status === 'error' &&
            login.type === 'mobile' &&
            !submitting &&
            this.renderMessage(
              formatMessage({ id: 'app.login.message-invalid-verification-code' }),
            )}
            <Mobile
              name="mobile"
              placeholder={formatMessage({ id: 'form.phone-number.placeholder' })}
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'validation.phone-number.required' }),
                },
                {
                  pattern: /^1\d{10}$/,
                  message: formatMessage({ id: 'validation.phone-number.wrong-format' }),
                },
              ]}
            />

            <Captcha
              name="captcha"
              placeholder={formatMessage({ id: 'form.verification-code.placeholder' })}
              countDown={120}
              onGetCaptcha={this.onGetCaptcha}
              getCaptchaButtonText={formatMessage({ id: 'form.get-captcha' })}
              getCaptchaSecondText={formatMessage({ id: 'form.captcha.second' })}
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'validation.verification-code.required' }),
                },
              ]}
            />


          </Tab>
          <div>
            <Checkbox checked={autoLogin} onChange={this.changeAutoLogin}>
              <FormattedMessage id="app.login.remember-me"/>
            </Checkbox>
            <a style={{ float: 'right' }} href="">
              <FormattedMessage id="app.login.forgot-password"/>
            </a>
          </div>
          <Submit loading={submitting}>
            <FormattedMessage id="app.login.login"/>
          </Submit>
          <div className={styles.other}>
            <FormattedMessage id="app.login.sign-in-with"/>
            <Icon type="alipay-circle" className={styles.icon} theme="outlined"/>
            <Icon type="taobao-circle" className={styles.icon} theme="outlined"/>
            <Icon type="weibo-circle" className={styles.icon} theme="outlined"/>
            <Link className={styles.register} to="/user/register">
              <FormattedMessage id="app.login.signup"/>
            </Link>
          </div>
        </Login>
      </div>
    );
  }
}

export default LoginPage;
