import * as common from '../../actions/common';

jest.mock('../../ethereum');

import { Oracle } from '../../ethereum';

Oracle.at.mockImplementation(() => ({
  retrieveData: jest.fn(() => ({
    c: [10],
    e: 20,
  })),
}));

describe('common', () => {
  it('gets start date price', async () => {
    const price = await common.getStartDatePrice('0x000...', '01/01/2018');
    expect(price).toMatchSnapshot();
  });

  it('handles incorrect data received', async () => {
    Oracle.at.mockImplementationOnce(() => ({
      retrieveData: jest.fn(),
    }));
    const price = await common.getStartDatePrice('0x000...', '01/01/2018');
    expect(price).toMatchSnapshot();
  });

  it('throws error when date is not passed', async () => {
    expect(common.getStartDatePrice('0x000...')).rejects.toMatchSnapshot();
  });
});
