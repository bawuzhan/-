//css��ģ��

//������Ԫ�����ݣ�content�����ڱ߾ࣨpadding�����߿�border������߾ࣨmargin������Ҫ�ء�
//bug ��ֱ�����marginֵ�ص�
//bug ����Ԫ�ص�����marginֵ������Ч
//bug ����Ԫ��û�б߿�borderʱ�����õ�һ����Ԫ�ص�margin-topֵ��ʱ�򣬻����margin-topֵ���ڸ�Ԫ���ϵ�����
//���Ը���Ԫ�ؼ�border padding overflow:hidden ��α��ȷ�ʽ����
//������ԣ�box-sizing : content-box | border-box | inherit;

//BFC
//BFC��ʽ�������ģ���Webҳ���к�ģ�Ͳ��ֵ�CSS��Ⱦģʽ��ָһ����������Ⱦ�������˵��һ������Ķ���������
//bfc����ҳ���ϵ�һ�����������������������Ԫ�ز���Ӱ������Ԫ��
//�γ�BFC������(�����ĵ���)

//��Ԫ��
//position: absolute/fixed
//display: inline-block / table
//float Ԫ��
//ovevflow !== visible

//BFC���ֹ���

//����ͬһ�� BFC ���������� Box ��ֱ����
//����ͬһ�� BFC ���������� Box �� margin �ᷢ���ص�
//BFC ����Ԫ�ص� margin box ����ߣ� ������� (BFC) border box�������Ӵ�
//BFC �����򲻻��� float ��Ԫ�������ص�
//���� BFC �ĸ߶�ʱ��������Ԫ��Ҳ�������
//���ֲ㲻�ᱻ�����㸲�ǣ���������Χ



//����Ӧ�������֣�����BFC �����򲻻��� float ��Ԫ�������ص� ��
/*body{
    width: 600px;
    position: relative;
}
.mydiv1{//BFCԪ��
    width: 100px;
    height: 150px;
    float: left;
    background: #f66;
}
.mydiv2{//BFCԪ�أ�����µ�BFC�����븡����mydiv1�ص�����˻���ݰ�����Ŀ�ȣ���mydiv1�Ŀ�ȣ��Զ���Ӧ��
    height: 200px;
    background: #fcc;
    overflow: hidden;
}
<body>
    <div class="mydiv1"></div>
    <div class="mydiv2">mydiv2������body�Ŀ�ȱ仯</div>
</body>*/


//BFC��Ӧ��
//��ֹmargin���ص���ͨ����һ��Ԫ�ذ���һ��BFCԪ�أ�
//����ڲ�����������div��λ��ͬһ�� BFC ����֮�У�
//����Ӧ��������(�ϱߵ�����)
//������ֹԪ�ر�����Ԫ�ظ���(�ϱߵ�����)

//���в���

//ˮƽ����
    //����Ԫ��: text-align: center
    //�鼶Ԫ��: margin: 0 auto
    //absolute + transform
    //flex + justify-content: center

//��ֱ����
    //line-height: height
    //absolute + transform
    //flex + align-items: center
    //table
//ˮƽ��ֱ����
    //position: absolute;left: 0;right: 0;top: 0;bottom: 0;margin: auto;
    //width: 100px;height: 100px;background: lightblue;position: absolute;left: 50%;top:  50%;transform: translate(-50px,-50px);
    //width: 100px;height: 100px;background: lightblue;position: absolute;left: 50%;top:  50%;margin-left:-50px;margin-top:-50px;
    //flex + justify-content + align-items
    //display: flex;justify-content: space-around;��ֱ�������ܻ��� align-content: space-around;�����������ܻ���align-items: center;
//flex���Բ���
    //�úúÿ�
//ѡ�������ȼ���
    //!important > ������ʽ > #id > .class > tag > * > �̳� > Ĭ��
//�帡��
    //��β���ӿ�div��ǩ����α�� :after{clear:both}
    //�������� BFC
    //�������ø߶�
//link �� @import ������
    //link���ܽ϶࣬���Զ��� RSS������ Rel �����ã���@importֻ�����ڼ��� css
    //��������linkʱ��ҳ���ͬ������������ css����@import�����õ� css ��ȵ�ҳ�������ű�����
    //link����ʹ�� js ��̬���룬@import����
//CSSԤ������(Sass/Less/Postcss) �����ص㿼��
    //Ƕ��
    //����
    //ѭ�����
    //�������
    //�Զ�ǰ׺
    //��λת��
    //mixin����
//CSS����
//transition: ���ɶ���
    //transition-property: ����
    //transition-duration: ���
    //transition-timing-function: ����
    //transition-delay: �ӳ�
    //���ù���: transitionend

    //transition:all 1s linear 0.5s;

//animation / @keyframes ֡����
    //animation-name: �������ƣ���Ӧ@keyframes
    //animation-duration: ���
    //animation-timing-function: ����
    //animation-delay: �ӳ�
    //animation-iteration-count: ����
    //infinite: ѭ������
    //animation-direction: ����
    //alternate: ���򲥷�
    //animation-fill-mode: ��ֹģʽ
    //forwards: ֹͣʱ���������һ֡
    //backwards: ֹͣʱ���ص���һ֡
    //both: ͬʱ���� forwards / backwards
    //���ù���: animationend

    //animation: hah 1s linear 0.5s infinite;
    //@keyframes hah {
    // 0%{
    // }
    // 100%{
    // }
    //}
//��������: ����ʹ�ö������Խ��ж�������ӵ�нϺõ����ܱ��� transform����
    //translate
    //scale
    //rotate
    //skew
    //opacity
    //color




