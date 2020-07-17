import { ScreenOrientation, screenOrientation } from './screen-orientation';

const portraitStub = { innerWidth: 500, innerHeight: 1000 };
const landscapeStub = { innerWidth: 1000, innerHeight: 500 };

describe('ScreenOrientation', () => {

    it('should return proper orientation', () =>
        expect(screenOrientation(landscapeStub)).toEqual(ScreenOrientation.LANDSCAPE)
    );

    it('should return Portrait orientation', () =>
        expect(screenOrientation(portraitStub)).toEqual(ScreenOrientation.PORTRAIT)
    );
});
