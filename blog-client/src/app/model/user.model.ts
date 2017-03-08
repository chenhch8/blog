

export class User {
    static IMG_URL: string = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1488712740&di=fc3a7c63907b4ea7230cace282db483e&imgtype=jpg&er=1&src=http%3A%2F%2Fnews.cnhubei.com%2Fxw%2Fyl%2F201701%2FW020170108783161092998.jpg';
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string
  imgUrl: string;
  birthday: string;
  gender: boolean;
  description: string;
  hobbies: string;
  job: string;

  constructor(info) {
    this.id = info.id;
    this.name = info.name || '某路人';
    this.imgUrl = info.imgUrl || User.IMG_URL;
    this.birthday = info.birthday || '保密';
    this.gender = info.gender || '保密';
    this.email = info.email || '暂无';
    this.phone = info.phone || '保密';
    this.address = info.phone || '保密';
    this.hobbies = info.hobbies || '保密';
    this.job = info.job || '保密';
    this.description = info.description || '这人很懒，什么也没有写～～';
  }
}