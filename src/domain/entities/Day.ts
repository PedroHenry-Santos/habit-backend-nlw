import { randomUUID } from 'node:crypto';

import { Replace } from '../../lib/helpers';

export interface IDayProps {
  date: Date;
}

export class Day {
  private _id: string
  private props: IDayProps

  constructor(props: Replace<IDayProps, {}>, id?: string) {
    this._id = id ?? randomUUID()
    this.props = props;
  }

  public get id() {
    return this._id
  }

  public get date() {
    return this.props.date
  }
}