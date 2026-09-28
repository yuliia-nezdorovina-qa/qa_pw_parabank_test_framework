import { mergeTests } from '@playwright/test';
import { test as genericTest } from './fixturesGeneric';
import { test as authTest } from './fixturesAuth';
import { test as accountTest } from './fixturesAccount';

export const test = mergeTests(genericTest, authTest, accountTest);
