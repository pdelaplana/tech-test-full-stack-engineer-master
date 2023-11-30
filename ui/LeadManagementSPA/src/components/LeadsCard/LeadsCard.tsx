import { 
    IonCard, 
    IonCardHeader, 
    IonCardTitle, 
    IonCardSubtitle, 
    IonCardContent,
    IonItemDivider, 
    IonText, 
    IonIcon, 
    IonButton, 
    IonButtons, 
    IonToolbar, 
    useIonToast
    } from '@ionic/react';
import LeadsAvatar from './components/LeadsAvatar';
import { briefcaseSharp, locationSharp, mailSharp, phonePortraitSharp } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useApiHelper } from '../../hooks/useApiHelper';
import { Job } from '../../models/job';
import { baseApiUrl } from '../../urls';

import './LeadsCard.css';

interface LeadsCardPops {
    id: number;
    contactName : string;
    contactEmail: string;
    contactPhone: string;
    dateCreated: Date;
    suburb: string;
    category: string;
    description: string;
    price: number;
    status: JobStatus;
    postcode: string;
    onUpdate: () => void;
}
const LeadsCard: React.FC<LeadsCardPops> = ({ 
    contactName, 
    contactEmail,
    contactPhone,
    dateCreated, 
    suburb,
    category,
    id,
    description,
    price,
    status,
    postcode,
    onUpdate
 }) => {

    const descriptionLength = 100;

    const [notification] = useIonToast();
    const [showMoreDescription, setShowMoreDescription] = useState(true);
    const {response, isLoading, error, callApi} = useApiHelper<Job>();

    useEffect(() =>{
        if (error) {
            presentNotification('Something went wrong.  Please try again or contact the help desk.')
        } 
    },[error])

    useEffect(() =>{
        if (response) {
            presentNotification('The status has been changed.');
            onUpdate();
        }
    },[response])

    const presentNotification = (message: string) => {
        notification({
            message: message,
            duration: 1500,
            position: 'top'
        })
    }

    const changeStatus = async (jobStatus:JobStatus) => {
        await callApi(`${baseApiUrl}/jobs/${id}`, 'PATCH', { status: jobStatus}); 
    }

    const formatDate = (value: Date) => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const formatter = new Intl.DateTimeFormat('en-AU', {
            weekday: 'long',
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            fractionalSecondDigits: 3,
            hour12: true,
            timeZone: 'UTC'
        });
        const datePartAccessor = (parts: Intl.DateTimeFormatPart[], key:string) =>{
            if (key === 'month'){
                return `${months[dateParts.find(p => p.type==='month') ? parseInt(dateParts.find(p => p.type==='month')!.value)-1 : 0]}`;
            } 
            return `${dateParts.find(p=>p.type===key)?.value}`
        }   
        const dateParts = formatter.formatToParts(value);
        return `
            ${datePartAccessor(dateParts,'month')} ${datePartAccessor(dateParts, 'day')} ${datePartAccessor(dateParts,'year')}
            @ 
            ${datePartAccessor(dateParts,'hour')}: ${datePartAccessor(dateParts,'minute')} ${datePartAccessor(dateParts,'dayPeriod')} 
            `;
    }

    const formatCurrency = (value:number) => {
        const formatter = new Intl.NumberFormat('en-AU', {
            style: 'currency',
            currency: 'AUD'
        });
        return formatter.format(value);
    }

    return(
        <IonCard className={"leadsCard"} mode="md" > 
            <IonCardHeader>
                <IonCardTitle>
                    <div className="ion-float-left ion-margin-end">
                        <LeadsAvatar name={contactName}  />
                    </div>
                    <div className="ion-float-left ion-margin-start">
                        <IonText >
                            {contactName}
                        </IonText>
                        <IonCardSubtitle>{formatDate(dateCreated)}</IonCardSubtitle>
                    </div>
                </IonCardTitle>
            </IonCardHeader>
            <IonItemDivider />
            <IonCardContent >
                <span className="ion-margin-end">
                    <IonIcon icon={locationSharp} className="ion-margin-top"/> &nbsp;
                    <IonText>{suburb} {postcode}</IonText>
                </span>
                <span className="ion-margin-end">
                    <IonIcon icon={briefcaseSharp} /> &nbsp;
                    <IonText>{category}</IonText>
                </span>
                <span className="ion-margin-end">
                    <IonText >Job Id:</IonText> &nbsp; <IonText>{String(id).padStart(5,'0')}</IonText>
                </span>
                <span>
                    <IonText><strong>{formatCurrency(price)}</strong> Lead Invitation</IonText>
                </span>
            </IonCardContent>
            {status === 'accepted' &&
                <>
                <IonItemDivider/>
                <IonCardContent>
                    <span className="ion-margin-end">
                        <IonIcon icon={phonePortraitSharp} size="small"  /> 
                        <IonText color="primary"> {contactPhone} </IonText>
                    </span>
                    <span className="ion-margin-end">
                        <IonIcon icon={mailSharp} size="small" /> 
                        <IonText color="primary"> {contactEmail}</IonText>
                    </span>
                </IonCardContent>
                </>
            }
            <IonItemDivider/>
            <IonCardContent>
                {showMoreDescription ? description.substring(0, descriptionLength) : description } &nbsp;
                {description.length > descriptionLength && 
                    <a onClick={() => setShowMoreDescription(!showMoreDescription)} 
                        style={{ cursor: "pointer"}}>{showMoreDescription ? 'Show More' : 'Show Less'}
                    </a>
                }
            </IonCardContent>
            {status === 'new' &&
                <>
                <IonItemDivider/>
                <IonToolbar>
                    <IonButtons className="ion-padding">
                        <IonButton fill="solid" color="primary" className="ion-text-capitalize" onClick={() => changeStatus('accepted')}>Accept</IonButton>
                        <IonButton className="ion-text-capitalize" onClick={() => changeStatus('declined')}>Decline</IonButton>
                    </IonButtons>
                </IonToolbar>
                </> 
            }
            
        </IonCard>
    )

}

export default LeadsCard;