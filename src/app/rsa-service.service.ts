import { Injectable } from '@angular/core';
import {Buffer} from 'buffer/';
import * as crypto from "crypto-browserify";

@Injectable()
export class RsaService {
  private workingKey: string = '741663A018EBAC73E68B194FC0EE86FC';
  private publicKey: string;
  private enabled: boolean = true;

  constructor() { }
  encrypt(plaintext: string): string {
    console.log('plaintext', plaintext)
    if (!this.enabled)
      return plaintext;

    let buffer = new Buffer(plaintext);
    console.log('buffer', buffer)
    let encrypted = crypto.privateEncrypt(this.workingKey, buffer);

    return encrypted.toString('base64');
  }

  decrypt(cypher: string): string {
    if (!this.enabled)
      return cypher;

    let buffer = Buffer.from(cypher, 'base64');
    let plaintext = crypto.publicDecrypt(this.workingKey, buffer);

    return plaintext.toString('utf8')
  }

}
