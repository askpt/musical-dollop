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
                { duration: '2s', target: 5 },
                { duration: '2s', target: 5 },
                { duration: '2s', target: 0 }
            ]      
        }
    }
};

export default function (data) {
    const res = http.get('http://hackaweather/weatherforecast');
    check(res, { 'status was 200': (r) => r.status == 200 });
}
