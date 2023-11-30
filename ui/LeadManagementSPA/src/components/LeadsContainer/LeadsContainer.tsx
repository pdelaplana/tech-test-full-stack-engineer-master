import {  IonIcon, IonItem, IonLabel, IonList, IonSpinner, IonText } from '@ionic/react';
import LeadsCard from '../LeadsCard/LeadsCard';
import useSWR from 'swr';
import { Job } from '../../models/job';
import { baseApiUrl } from '../../urls';
import { alertCircleSharp } from 'ionicons/icons';

import './LeadsContainer.css';

export interface LeadsContainerProps 
{ 
    fetchLeadsbyStatus: JobStatus;
    fetchSize?: number;
    fetchOffset?: number;
}

const LeadsContainer: React.FC<LeadsContainerProps> = ({ fetchLeadsbyStatus, fetchSize=100, fetchOffset=0 }) => {

    const fetcher = async (url:string) => { 
        return (await fetch(url)).json();
    }

    const { data: jobs, error, isLoading, isValidating, mutate } = useSWR<Job[]>(
        `${baseApiUrl}/jobs?status=${fetchLeadsbyStatus}`, 
        (url) => fetcher(url),
        {
            revalidateIfStale: true,
            revalidateOnReconnect: true,
            revalidateOnFocus: false
        }
    )

    if (error) {
        return <IonText color="danger">Unable to fetch data due to an error</IonText>
    }

    if (isValidating){
        return  <div className="spinnerContainer"><IonSpinner name="circles"></IonSpinner></div>

    } 

    return (
        <IonList>
            {jobs?.map((job:Job) => 
                <IonItem lines="none" key={job.id}>
                    <LeadsCard 
                        id={job.id} 
                        contactName={job.contact_name} 
                        contactEmail={job.contact_email}
                        contactPhone={job.contact_phone}
                        dateCreated={new Date(job.created_at)} 
                        suburb={job.suburb} 
                        category={job.category} 
                        description={job.description} 
                        price={job.price}
                        status={job.status}
                        postcode={job.postcode}
                        onUpdate={() => mutate()} /> 
                </IonItem>
            )}
            {(jobs?.length == 0) && 
                <IonItem lines="none">
                    
                    <IonLabel className="ion-text-center" color="primary">
                    <IonIcon icon={alertCircleSharp} size="large" ></IonIcon>
                        <h1>Nothing to see here</h1>
                    </IonLabel>
                </IonItem>
            }
        </IonList>
    );
  };
  
  export default LeadsContainer;