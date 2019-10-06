import {MarketPlaceModule} from './market-place.module';

describe('MarketPlaceModule', () => {
    let marketPlaceModule: MarketPlaceModule;

    beforeEach(() => {
        marketPlaceModule = new MarketPlaceModule();
    });

    it('should create an instance', () => {
        expect(marketPlaceModule).toBeTruthy();
    });
});
