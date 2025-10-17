import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Setting } from './schemas/setting.schema';

@Injectable()
export class SettingsService {
  constructor(@InjectModel(Setting.name) private settingModel: Model<Setting>) {}

  async updateSetting(key: string, value: any) {
    return this.settingModel.findOneAndUpdate({ key }, { value }, { upsert: true, new: true });
  }

  async getSetting(key: string) {
    return this.settingModel.findOne({ key });
  }

  async getAllSettings() {
    return this.settingModel.find();
  }
}
