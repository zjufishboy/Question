import React, { useState } from 'react';
import styles from './Login.less';
import stylesCommon from '@/global.less';
import * as Utility from '@/Utility/utils';
import { Photo } from '../Photo';
import { Link, history } from 'umi';

const iconStyle1 = {
    width: 20,
    height: 20,
    url: 'http://image.wjx.com/images/register-login/user.png',
};
const iconStyle2 = {
    width: 20,
    height: 20,
    url: 'http://image.wjx.com/images/register-login/password.png',
};
const iconStyle3 = {
    width: 20,
    height: 20,
    url: 'http://img.fishstar.xyz/question/email.png',
};
const Login = (props: {}) => {
    const handleClick=()=>{
        history.push("/manage")
    }
    return (
        <div className={styles.loginOrRegister}>
            <div className={styles.loginTitle}>问卷系统登录</div>
            <div
                className={Utility.styleMerge([
                    styles.LoginInput,
                    stylesCommon.scFlexRow,
                ])}
            >
                <div
                    className={Utility.styleMerge([
                        styles.LoginIcon,
                        stylesCommon.ccFlexRow,
                    ])}
                >
                    <Photo style={iconStyle1} />
                </div>
                <input
                    type="text"
                    className={styles.LoginInputArea}
                    placeholder={'用户名/Email/手机'}
                />
            </div>
            <div
                className={Utility.styleMerge([
                    styles.LoginInput,
                    stylesCommon.scFlexRow,
                ])}
            >
                <div
                    className={Utility.styleMerge([
                        styles.LoginIcon,
                        stylesCommon.ccFlexRow,
                    ])}
                >
                    <Photo style={iconStyle2} />
                </div>
                <input
                    type="password"
                    className={styles.LoginInputArea}
                    placeholder={'请输入登录密码'}
                />
            </div>
            <div
                className={Utility.styleMerge([
                    styles.LoginButton,
                    stylesCommon.ccFlexRow,
                ])}
                onClick={handleClick}
            >
                登 录
      </div>
            <div
                className={Utility.styleMerge([
                    styles.LoginInput,
                    stylesCommon.ccFlexRow,
                ])}
            >
                <span className={styles.registerNow}>立即注册</span>
            </div>
        </div>
    );
};
const Register = (props: {}) => {
    const handleClick=()=>{
        history.push("/manage")
    }
    return (
        <div className={styles.loginOrRegister}>
            <div className={styles.loginTitle}>问卷系统注册</div>
            <div
                className={Utility.styleMerge([
                    styles.LoginInput,
                    stylesCommon.scFlexRow,
                ])}
            >
                <div
                    className={Utility.styleMerge([
                        styles.LoginIcon,
                        stylesCommon.ccFlexRow,
                    ])}
                >
                    <Photo style={iconStyle1} />
                </div>
                <input
                    type="text"
                    className={styles.LoginInputArea}
                    placeholder={'用户名'}
                />
            </div>
            <div
                className={Utility.styleMerge([
                    styles.LoginInput,
                    stylesCommon.scFlexRow,
                ])}
            >
                <div
                    className={Utility.styleMerge([
                        styles.LoginIcon,
                        stylesCommon.ccFlexRow,
                    ])}
                >
                    <Photo style={iconStyle2} />
                </div>
                <input
                    type="password"
                    className={styles.LoginInputArea}
                    placeholder={'请输入登录密码'}
                />
            </div>
            <div
                className={Utility.styleMerge([
                    styles.LoginInput,
                    stylesCommon.scFlexRow,
                ])}
            >
                <div
                    className={Utility.styleMerge([
                        styles.LoginIcon,
                        stylesCommon.ccFlexRow,
                    ])}
                >
                    <Photo style={iconStyle3} />
                </div>
                <input
                    type="password"
                    className={styles.LoginInputArea}
                    placeholder={'邮箱'}
                />
            </div>
            <div
                className={Utility.styleMerge([
                    styles.LoginButton,
                    stylesCommon.ccFlexRow,
                ])}
                onClick={handleClick}
            >
                注 册
      </div>
            <div
                className={Utility.styleMerge([
                    styles.LoginInput,
                    stylesCommon.ccFlexRow,
                ])}
            >
                <span className={styles.registerNow}>已有账号？前去登录</span>
            </div>
        </div>
    );
};

export const LoginOrRegister = (props: { isLogin: boolean }) => {
    return props.isLogin ? <Login /> : <Register />;
};
