import Router from './index'
import Vote from '@/components/Vote'

describe('Router', () => {
    it('should have a route for vote', () => {
        let exist = false;
        let path = '/vote';
        let name = 'Vote';

        Router.options.routes.forEach(route => {
           if (route.name === name && route.path === path) {
               expect(route.component).toBe(Vote);
               exist = true;
           } 
        });
        expect(exist).toBe(true);
    });
});