import { IonApp, SegmentChangeEventDetail } from '@ionic/react';
import { fireEvent, render, screen } from '@testing-library/react';
import LeadsPage from './LeadsPage';
import { http, HttpHandler, HttpResponse } from 'msw';
import { setupServer } from 'msw/node'

const handlers = [
    http.get('http://localhost:8080/jobs?status=new', () => {
        return HttpResponse.json([{
            "id":1,
            "status":"new",
            "suburb_id":1,
            "category_id":1,
            "contact_name":"Luke Skywalker",
            "contact_phone":"0412345678",
            "contact_email":"luke@mailinator.com",
            "price":20,
            "description":"",
            "created_at":"2023-11-29T05:46:21.000Z",
            "updated_at":"2023-11-29T22:23:33.000Z",
            "category":"Plumbing",
            "suburb":"Sydney",
            "postcode":"2000"
        }])
    }),
    http.get('http://localhost:8080/jobs?status=accepted', () => {
        return HttpResponse.json([{
            "id":2,
            "status":"accepted",
            "suburb_id":1,
            "category_id":1,
            "contact_name":"Darth Vader",
            "contact_phone":"0412345678",
            "contact_email":"luke@mailinator.com",
            "price":20,
            "description":"",
            "created_at":"2023-11-29T05:46:21.000Z",
            "updated_at":"2023-11-29T22:23:33.000Z",
            "category":"Plumbing",
            "suburb":"Sydney",
            "postcode":"2000"
        }])
    }),
  ]

const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('renders LeadsPage crashing', () => {
    render(
        <IonApp>
          <LeadsPage/>
        </IonApp>
    );
    
    expect(screen.getByTestId('LeadsPage')).toBeInTheDocument();
});


test('when leads page render, then page loads new leads', async () => {
   
    render(
        <IonApp>
          <LeadsPage/>
        </IonApp>
    );
    
    const contactName = await screen.findByText('Luke Skywalker'); 
    expect(contactName).toBeInTheDocument();

});

test('when switch to accepted tab the list of accepted leads should be loaded', async () => {
   
    render(
        <IonApp>
          <LeadsPage/>
        </IonApp>
    ); 
    
    const tab = await screen.findByTestId('main_tabs'); 
    expect(tab).toBeInTheDocument();


    
    fireEvent.change(tab, new CustomEvent('SegmentCustomEvent ', { detail: { value: 'accepted'}}));

    const contactName = await screen.findByText('Darth Vader'); 
    expect(contactName).toBeInTheDocument();


});


