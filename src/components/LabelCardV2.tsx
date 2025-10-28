import { LabelItem, fmtPrice, titlePt } from '../lib/label-utils';
import logoP54 from '../assets/logo-point54.png';

export default function LabelCardV2({ item }: { item: LabelItem }) {
  return (
    <div className="label-v2">
      <div className="logo">
        <img src={logoP54} alt="Point 54" />
      </div>
      <div className="ref">
        Réf : <b>{item.ref || '—'}</b>
      </div>
      <div className="ean">{item.ean || '—'}</div>
      <div className="media">
        {item.image ? (
          <img src={item.image} alt="" />
        ) : (
          <div className="noimg">NO IMAGE</div>
        )}
      </div>
      <div className="title" style={{ fontSize: `${titlePt(item.title)}pt` }}>
        {String(item.title).toUpperCase()}
      </div>
      <div className="price">
        <span className="pnum">{fmtPrice(item.price)}</span>
        <span className="peur">€</span>
      </div>
    </div>
  );
}
