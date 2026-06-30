import { baseEmail } from '../layouts/baseEmail.js';

export const rectangleEmail = ({ firstName }) => {
  const content = `
    <p style="font-size: 15px; line-height: 1.6; color: #333;">Hi ${firstName || 'there'},</p>

    <!-- Fit Characteristics -->
    <div class="section">
      <h2 class="section-title">Fit Characteristics Identified</h2>
      <ul class="list">
        <li>Straighter waist to hip proportions</li>
        <li>Reduced lower-body anchor point</li>
        <li>Higher likelihood of garment instability during movement</li>
      </ul>
    </div>

    <!-- Explanation -->
    <div class="section">
      <p style="font-size: 15px; line-height: 1.6; color: #333;">
        Women with straighter body proportions often get closer to a workable fit than many other body shapes.
      </p>
      <p style="font-size: 15px; line-height: 1.6; color: #333;">
        But once garments are worn dynamically — crouching, climbing, kneeling, stretching — different fit problems can begin to appear.
      </p>
    </div>

    <!-- Why This Happens -->
    <div class="section">
      <h2 class="section-title">WHY THIS HAPPENS</h2>
      <p style="font-size: 15px; line-height: 1.6; color: #333;">
        Many workwear brands still grade from a single base pattern shape, scaling garments up and down without properly accounting for different body proportions or movement.
      </p>
      <p style="font-size: 15px; line-height: 1.6; color: #333;">
        For women in trades, sizing has also historically been influenced either by male workwear datasets or by women's retail sizing systems that weren't designed around physical work.
      </p>
      <p style="font-size: 15px; line-height: 1.6; color: #333;">
        Many work trousers rely on the hips and seat to help stabilise the garment during movement. With straighter body proportions, that anchor point is often less pronounced.
      </p>
    </div>

    <!-- Issues -->
    <div class="section">
      <h2 class="section-title">THIS CAN LEAD TO ISSUES LIKE</h2>
      <ul class="list">
        <li>trousers slipping or dropping during movement</li>
        <li>waistbands shifting throughout the day</li>
        <li>twisting through the leg while crouching or climbing</li>
        <li>a fit that feels stable standing still, but inconsistent in motion</li>
      </ul>
      <p style="font-size: 15px; line-height: 1.6; color: #333; font-style: italic; margin-top: 10px;">
        Most workwear isn't designed around these movement mechanics.
      </p>
    </div>

    <!-- Threadline Approach -->
    <div class="highlight-box">
      <h2 class="section-title">AT THREADLINE, FIT IS APPROACHED DIFFERENTLY</h2>
      <ul class="list">
        <li>fit is engineered around body shape, not just size</li>
        <li>patterns are developed around movement and stability</li>
        <li>reinforcement is placed where women actually experience wear</li>
        <li>materials are selected for durability, structure, and long-term consistency</li>
      </ul>
      <p style="font-size: 15px; line-height: 1.6; color: #333; font-style: italic; margin-top: 10px;">
        This means the fit stays secure and consistent while you work — not just when you first try it on.
      </p>
    </div>

    <!-- What Happens Next -->
    <div class="section">
      <h2 class="section-title">WHAT HAPPENS NEXT</h2>
      <p style="font-size: 15px; line-height: 1.6; color: #333;">
        As an early member, you're part of the group helping shape what comes next.
      </p>
      <p style="font-size: 15px; line-height: 1.6; color: #333;">
        As Threadline develops, members will be invited to refine their Fit ID using phone-based body scanning technology — helping build workwear around real body proportions and movement, not simplified sizing assumptions.
      </p>
      <p style="font-size: 15px; line-height: 1.6; color: #333;">
        Threadline's first launches will be released in limited numbers while the fit system is refined through wear testing, movement analysis, and body scan data.
      </p>
      <p style="font-size: 15px; line-height: 1.6; color: #333;">
        To move up the early access waitlist, share your Fit ID result on Instagram and tag <a href="https://instagram.com/threadline_workwear" class="link">@threadline_workwear</a> so we can verify your share.
      </p>
      <p style="font-size: 15px; line-height: 1.6; color: #333;">
        Members who help grow the early community will receive priority positioning for future product releases, fit testing opportunities, and early launch access.
      </p>
    </div>

    <!-- Signature -->
    <div class="signature">
      <p style="font-size: 15px; line-height: 1.6; color: #333;">— Emma at Threadline</p>
    </div>
  `;

  return baseEmail({
    title: 'RECTANGLE',
    fitId: 'RECTANGLE',
    content,
  });
};