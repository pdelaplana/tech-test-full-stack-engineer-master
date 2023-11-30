import { IonContent, IonHeader, IonLabel, IonPage, IonSegment, IonSegmentButton, IonTitle, IonToolbar } from '@ionic/react';
import LeadsContainer from '../components/LeadsContainer/LeadsContainer';

import './LeadsPage.css';
import { useState } from 'react';

const LeadsPage: React.FC = () => {

  const [fetchByStatus, setFetchByStatus] = useState<JobStatus>('new');
  return (
    <IonPage data-testid="LeadsPage">
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonTitle className="ion-text-center" color="primary">Your Leads</IonTitle> 
        </IonToolbar>
        <IonToolbar className="segment">
          <IonSegment data-testid="main-tabs" value={fetchByStatus} mode="md" onIonChange={(event)=>setFetchByStatus((state) => state = event.detail.value as JobStatus )}>
            <IonSegmentButton value="new">
              <IonLabel className="ion-text-capitalize">Invited</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="accepted" data-testid="accepted_tab">
              <IonLabel className="ion-text-capitalize">Accepted</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>  
      </IonHeader>
      <IonContent >
        <LeadsContainer fetchLeadsbyStatus={fetchByStatus} />
      </IonContent>
    </IonPage>
  );
};

export default LeadsPage;
