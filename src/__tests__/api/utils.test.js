import mockAxios from 'jest-mock-axios';

import * as utils from '../../api/utils';

afterEach(() => {
  mockAxios.reset();
});

it('should call url', async () => {
  mockAxios.get.mockImplementationOnce(() => {
    return {
      data: {
        Data: [
          { time: 0, close: 10 },
          { time: 1, close: 20 },
          { time: 2, close: 30 },
        ],
      },
    };
  });

  const data = await utils.get('foo');

  expect(mockAxios.get).toHaveBeenCalledWith('foo');
  expect(data).toMatchSnapshot();
});

it('should raise error', async () => {
  mockAxios.get.mockImplementationOnce(() => {
    throw new Error('error');
  });

  const data = await utils.get('foo');

  expect(data).toMatchSnapshot();
});
