import { LabelItem, fmtPrice, titlePt } from '../lib/label-utils';
import logoP54 from '../assets/logo-point54.png';
import type { TemplateConfig } from './EditeurTemplate';

interface LabelCardV2Props {
  item: LabelItem;
  templateConfig?: TemplateConfig;
}

export default function LabelCardV2({ item, templateConfig }: LabelCardV2Props) {
  const config = templateConfig || {
    fontSize: { designation: 7, reference: 6, price: 16, barcode: 6 },
    colors: { price: '#FF6600', text: '#000000', logo: '#FF6600' },
    fontFamily: 'Arial',
    logoSize: 40,
    imageHeight: 60,
  };

  return (
    <div className="label-v2" style={{ fontFamily: config.fontFamily, color: config.colors.text }}>
      <div className="logo">
        <img src={logoP54} alt="Point 54" style={{ maxHeight: `${config.logoSize}%` }} />
      </div>
      <div className="ref" style={{ fontSize: `${config.fontSize.reference}pt` }}>
        Réf : <b>{item.ref || '—'}</b>
      </div>
      <div className="ean" style={{ fontSize: `${config.fontSize.barcode}pt` }}>{item.ean || '—'}</div>
      <div className="media" style={{ height: `${config.imageHeight}%` }}>
        {item.image ? (
          <img src={item.image} alt="" />
        ) : (
          <div className="noimg">NO IMAGE</div>
        )}
      </div>
      <div className="title" style={{ fontSize: `${config.fontSize.designation}pt` }}>
        {String(item.title).toUpperCase()}
      </div>
      <div className="price" style={{ color: config.colors.price }}>
        <span className="pnum" style={{ fontSize: `${config.fontSize.price}pt` }}>{fmtPrice(item.price)}</span>
        <span className="peur">€</span>
      </div>
    </div>
  );
}
