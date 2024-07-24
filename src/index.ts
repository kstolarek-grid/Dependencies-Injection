import { Logger } from './services/logger';

import type { User } from './types';
import { createIoCContainer } from './ioc';
import type IoCContainer from 'ioc-lite';

type IoC = IoCContainer<Record<any, string>>;

const renderUsers = async (ioc: IoC) => {
  const usersService = ioc.resolve('users');
  const users = await usersService.getUsers();

  const listNode = document.getElementById('users-list');

  users.forEach((user: User) => {
    const listItemNode = document.createElement('li');

    listItemNode.innerHTML = user.name;
    listNode.appendChild(listItemNode);
  });
};

const app = (ioc: IoC) => {
  renderUsers(ioc);
};

const logPageLoaded = (ioc: IoC) => {
  const logger = ioc.resolve('logger');

  logger.info('Page is loaded.');
};

const loadConfigAndCreateIoC = () => {
  const config = (window as any).__CONFIG__;
  delete (window as any).__CONFIG__;

  return createIoCContainer(config.api);
};

window.onload = (event: Event) => {
  const ioc = loadConfigAndCreateIoC();

  logPageLoaded(ioc);

  app(ioc);
};
