import http from 'k6/http';
import { check } from 'k6';
export const options = {
    scenarios: {
        load_testing: {
            executor: 'ramping-arrival-rate',
            preAllocatedVUs: 5,
            startRate: 1,
            timeUnit: '1s',
            maxVUs: 10,
            stages: [
                { duration: '30s', target: 5 },
                { duration: '1m', target: 5 },
                { duration: '30s', target: 0 }
            ]      
        },
        spike_testing: {
            executor: 'ramping-arrival-rate',
            preAllocatedVUs: 10,
            startRate: 1,
            timeUnit: '1s',
            maxVUs: 20,
            startTime: '125s',
            stages: [
                { duration: '15s', target: 3 },
                { duration: '30s', target: 3 },
                { duration: '15s', target: 6 },
                { duration: '30s', target: 6 },
                { duration: '15s', target: 9 },
                { duration: '30s', target: 9 }              
            ]      
        },
        soak_testing: {
            executor: 'ramping-arrival-rate',
            preAllocatedVUs: 5,
            startRate: 1,
            timeUnit: '1s',
            maxVUs: 10,
            startTime: '265s',
            stages: [
                { duration: '1m', target: 4 },
                { duration: '58m', target: 4 },
                { duration: '1m', target: 0 }
            ]

        }        
    }
};

export default function (data) {
    const res = http.get('https://crashtest.azurewebsites.net');
    check(res, { 'status was 200': (r) => r.status == 200 });
}