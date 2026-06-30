import { baseEmail } from '../layouts/baseEmail.js';

export const liftEmail = ({ firstName }) => {
  const content = `
    <p style="font-size: 15px; line-height: 1.6; color: #333;">Hi ${firstName || 'there'},</p>

    <!-- Fit Characteristics -->
    <div class="section">
      <h2 class="section-title">Fit Characteristics Identified</h2>
      <ul class="list">
        <li>Increased seat projection relative to hip width</li>
        <li>Greater lower-body depth during movement</li>
        <li>Higher likelihood of seat and rise tension in standard trouser patterns</li>
      </ul>
    </div>

    <!-- Explanation -->
    <div class="section">
      <p style="font-size: 15px; line-height: 1.6; color: #333;">
        Women with greater seat projection often encounter fit problems that standard sizing systems struggle to predict.
      </p>
      <p style="font-size: 15px; line-height: 1.6; color: #333;">
        Even when waist and hip measurements appear correct, the garment may not provide sufficient depth through the seat and rise to accommodate movement comfortably.
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
        Many work trousers are designed around assumptions about how volume is distributed through the hips, seat and upper thighs. When more of that volume sits in the seat and projects further from the body, standard trouser patterns can struggle to provide enough depth and movement allowance without affecting fit elsewhere.
      </p>
    </div>

    <!-- Issues -->
    <div class="section">
      <h2 class="section-title">THIS CAN LEAD TO ISSUES LIKE</h2>
      <ul class="list">
        <li>pulling through the seat when crouching or climbing</li>
        <li>waistbands being pulled down at the back during movement</li>
        <li>restriction despite the waist and hips appearing to fit correctly</li>
        <li>tension through the rise when kneeling, bending or stretching</li>
        <li>excess wear through the seat and upper-thigh areas</li>
      </ul>
      <p style="font-size: 15px; line-height: 1.6; color: #333; font-style: italic; margin-top: 10px;">
        Most workwear isn't designed around these movement and projection mechanics.
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
    title: 'LIFT',
    fitId: 'LIFT',
    content,
  });
};