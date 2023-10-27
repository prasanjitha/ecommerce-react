import React from 'react';
import {
    Button,
    Input,
} from 'antd';

import classes from './Footer.module.css';
import Logo from '../assets/icons/home/logo.png';
import Instagram from '../assets/icons/footer/instagram.png';

const Footer = () => {
    return (
        <div className={classes.mainContainer}>
            < div className={classes.footer}>
                <div className={classes.left}>
                    <div className={classes.logo}>
                        <img alt='logo' src={Logo} className={classes.logoImage} />
                        <p className={classes.logoText}>Comforty</p>
                    </div>
                    <div className={classes.description}>
                        Vivamus tristique odio sit amet velit semper, eu posuere turpis interdum. Cras egestas purus
                    </div>

                    <div className={classes.socialMedia}>
                        <img alt='instagram' className={classes.footerIcon} src={Instagram} />
                        <img alt='instagram' className={classes.footerIcon} src={Instagram} />
                        <img alt='instagram' className={classes.footerIcon} src={Instagram} />
                        <img alt='instagram' className={classes.footerIcon} src={Instagram} />
                    </div>

                </div>
                <div className={classes.right}>
                    <p className={classes.newsLetter}>Newsletter</p>
                    <div className={classes.emailContaier}>
                        <Input className={classes.emailInput} placeholder="Your email" />
                        <Button type="primary" className={classes.subscribe}>Subscribe</Button>

                    </div>
                    <p className={classes.footerRightText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt erat enim.</p>
                </div>
            </div>
            <div className={classes.footerAreaText}>
                <p>@ 2021 - Blogy - Designed & Develop by <span className={classes.designerName}>NMG</span></p>
            </div>
        </div>
    )
}

export default Footer;