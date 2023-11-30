import { IonAvatar } from "@ionic/react";

interface LeadsAvatarProps {
    name: string
}

const LeadsAvatar: React.FC<LeadsAvatarProps> = ({ name }) => {
    const url = `https://ui-avatars.com/api/?name=${name}&background=FF7A11&color=fff`;
    return(
        <IonAvatar>
            <img src={url}></img>
        </IonAvatar>
    );
}

export default LeadsAvatar;