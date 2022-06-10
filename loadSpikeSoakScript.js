import http from 'k6/http';
import { check } from 'k6';
export const options = {
	thresholds: {
    	http_req_failed: ['rate<0.01'], // http errors should be less than 1%
    	http_req_duration: ['p(95)<15'], // 95% of requests should be below 200ms
  	},
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
