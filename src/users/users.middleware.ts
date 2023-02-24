import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

export function logger(req: Request, res: Response, next: NextFunction) {
    console.log(`Request...`);
    next();
};

export function check(req: Request, res: Response, next: NextFunction) {
    console.log(`check...`);
    next();
};
export function heyz(req: Request, res: Response, next: NextFunction) {
    console.log(`heys...`);
    next();
};