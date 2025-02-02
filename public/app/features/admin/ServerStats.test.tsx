import React from 'react';
import { render, screen } from '@testing-library/react';
import { ServerStats, Props } from './ServerStats';
import { ServerStat } from './state/apis';

const stats: ServerStat = {
  activeAdmins: 1,
  activeEditors: 0,
  activeSessions: 1,
  activeUsers: 1,
  activeViewers: 0,
  admins: 1,
  alerts: 5,
  dashboards: 1599,
  datasources: 54,
  editors: 2,
  orgs: 1,
  playlists: 1,
  snapshots: 1,
  stars: 3,
  tags: 42,
  users: 5,
  viewers: 2,
};

const getServerStats = () => {
  return Promise.resolve(stats);
};

const setup = (propOverrides?: Partial<Props>) => {
  const props: Props = {
    getServerStats,
  };
  Object.assign(props, propOverrides);

  render(<ServerStats {...props} />);
};
describe('ServerStats', () => {
  it('Should render page with stats', async () => {
    setup();
    expect(await screen.findByRole('heading', { name: /instance statistics/i })).toBeInTheDocument();
    expect(screen.getByText('Dashboards (starred)')).toBeInTheDocument();
    expect(screen.getByText('Tags')).toBeInTheDocument();
    expect(screen.getByText('Playlists')).toBeInTheDocument();
    expect(screen.getByText('Snapshots')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Manage dashboards' })).toBeInTheDocument();
  });
});
