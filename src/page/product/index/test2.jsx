/*
 * @Author: Johnhong9527
 * @Date:   2019-06-11 15:19:03
 * @Last Modified by:   Johnhong9527
 * @Last Modified time: 2019-06-11 15:38:03
 */
import React from 'react';
import { Form, Row, Col, Upload, Button, Icon } from 'antd';
const FormItem = Form.Item;
class HUploadPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filelist: []
    };
  }
  componentWillMount() {
    this.setFileList();
  }
  setFileList() {
    const list = [
      {
        uid: '-1',
        name: 'xxx.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
      },
      {
        uid: '-2',
        name: 'yyy.png',
        status: 'done',
        url: 'https://www.html.cn/newimg88/2018/11/map.jpg',
        thumbUrl: 'https://www.html.cn/newimg88/2018/11/map.jpg'
      }
    ];
    console.log(34);
    this.setState({
      filelist: [...list]
    });
  }

  render() {
    const { filelist } = this.state;
    console.log(filelist);
    return (
      <Form>
        <FormItem>
          <Upload
            // disabled={true}
            name="subImages"
            defaultFileList={filelist}
            // onPreview={e => this.upHandlePreview(e)}
            // onChange={e => this.upHandleChange(e)}
            listType="picture-card"
            // customRequest={e => this.upCustomRequest(e)}
            // action="http://adminv2.happymmall.com/manage/product/upload.do"
          >
            <div>
              {/*<Progress percent={30} />*/}
              <Icon type="plus" />
              <div className="ant-upload-text">上传图片</div>
            </div>
          </Upload>
        </FormItem>
        <FormItem>
          <Button type="primary" onClick={e => this.setFileList(e)}>
            设置已提交列表
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const HUpload = Form.create({ name: 'product-test' })(HUploadPage);
export default HUpload;
