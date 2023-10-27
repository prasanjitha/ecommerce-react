import { loggedUser } from '../util/auth';
import classes from './ProfileDetails.module.css';

const ProfileDetails = () => {

    const user = loggedUser();

    return (
        <div className={classes.mainContainer}>
            <div className={classes.contaier}>
                <img alt='profile' className={classes.profileImage} src={user.image} />
                <div className={classes.profileDetails}>
                    <div className={classes.info}>
                        <p>Name :</p>
                        <p className={classes.infoDetails}>{user.firstName + ' ' + user.lastName}</p>
                    </div>
                    <div className={classes.info}>
                        <p>DOB :</p>
                        <p className={classes.infoDetails}>23/12/1996</p>
                    </div>
                    <div className={classes.info}>
                        <p>Mobile :</p>
                        <p className={classes.infoDetails}>076 99 12 543</p>
                    </div>
                    <div className={classes.info}>
                        <p>Email :</p>
                        <p className={classes.infoDetails}>{user.email}</p>
                    </div>
                    <div className={classes.info}>
                        <p>NIC :</p>
                        <p className={classes.infoDetails}>961029348V</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileDetails;


