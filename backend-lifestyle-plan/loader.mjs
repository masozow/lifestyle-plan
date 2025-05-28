import { register } from 'node:module';
import { pathToFileURL } from 'node:url';
import process from 'node:process';

process.removeAllListeners('warning'); // Optional: suppress warnings

register('ts-node/esm', pathToFileURL('./'));