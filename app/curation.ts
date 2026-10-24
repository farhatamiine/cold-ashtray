export const categoryOrder = [
  "The Flesh",
  "The Bond",
  "The Face",
  "The Memory",
  "The Page",
] as const;

export type ArtworkCategory = (typeof categoryOrder)[number];

export const categoryNotes: Record<ArtworkCategory, string> = {
  "The Flesh": "Anatomy, mutation, and the body as an unstable house.",
  "The Bond": "Figures held together by tenderness, need, and shared ruin.",
  "The Face": "Portraits, masks, and the terror of being seen incorrectly.",
  "The Memory": "Rooms, relics, and ordinary moments already becoming ghosts.",
  "The Page": "Confessions where language continues the work of the drawings.",
};

type CuratorialEntry = {
  title: string;
  interpretation: string;
  category: ArtworkCategory;
};

export const curation: Record<string, CuratorialEntry> = {
  "1792774744": {
    title: "The Last Warmth",
    interpretation:
      "A face turns away while one exposed eye remains behind, as if memory refuses the mercy of a clean departure.",
    category: "The Face",
  },
  "1792278928": {
    title: "The Choir Bound",
    interpretation:
      "Three minds are pulled into one body by red cords: not harmony, but a shared sentence none can escape alone.",
    category: "The Flesh",
  },
  "1786752874": {
    title: "Vestment of Quiet",
    interpretation:
      "The dress gathers around the seated figure like pale architecture, turning stillness into a room she can briefly inhabit.",
    category: "The Memory",
  },
  "1784856889": {
    title: "The People Who Never Knew I Missed Them",
    interpretation:
      "A vanished friendship survives as an empty frame: absence becomes visible only after the room has learned to live without us.",
    category: "The Page",
  },
  "1784656547": {
    title: "A Kiss Before the Fall",
    interpretation:
      "Two guarded figures meet at the edge of danger, where intimacy is less a rescue than a chosen surrender.",
    category: "The Bond",
  },
  "1784508107": {
    title: "The Ashen Pilgrim",
    interpretation:
      "Beneath the hood, the human face opens into machinery and tissue; the traveller carries his ruin as his only country.",
    category: "The Flesh",
  },
  "1784508106": {
    title: "Smoke Beneath the Skin",
    interpretation:
      "The cigarette offers a small ritual of control while the face quietly separates into bone, muscle, cloth, and shadow.",
    category: "The Flesh",
  },
  "1783729614": {
    title: "The Basement Had More Rooms",
    interpretation:
      "Pages, studies, and stains form a map of recurrence: each attempted escape reveals another chamber built from the self.",
    category: "The Page",
  },
  "1783210124": {
    title: "The Animal That Keeps Watch",
    interpretation:
      "A sleeping figure borrows safety from the creature beneath her cheek, trusting instinct to guard what consciousness cannot.",
    category: "The Memory",
  },
  "1781988813": {
    title: "A Face Remembered in Pieces",
    interpretation:
      "The portrait arrives as overlapping fragments, suggesting that recognition is assembled from damage rather than certainty.",
    category: "The Face",
  },
  "1780512583": {
    title: "To My Future Grief",
    interpretation:
      "A letter mourns the living in advance, reminding us that ordinary closeness is already becoming an irreplaceable relic.",
    category: "The Page",
  },
  "1779203055": {
    title: "Saint of the Open Nerve",
    interpretation:
      "Ornament and anatomy grow from the same wound, making exposure look ceremonial without making it painless.",
    category: "The Flesh",
  },
  "1777074656": {
    title: "The Basement of the Self",
    interpretation:
      "Two ruined bodies support one another below the polished rooms of personhood, finding shelter in what society asks them to hide.",
    category: "The Page",
  },
  "1775860703": {
    title: "What Grief Holds",
    interpretation:
      "A child rests against a body thinned by sorrow; tenderness survives here not by curing decay, but by refusing to leave it alone.",
    category: "The Bond",
  },
  "1775428534": {
    title: "She Carries Her Own Ruin",
    interpretation:
      "The divided portrait keeps beauty and exposed anatomy in one frame, denying the fiction that grace requires wholeness.",
    category: "The Flesh",
  },
  "1775244290": {
    title: "Let Me Rot in Your Arms",
    interpretation:
      "The plea transforms decay into devotion: to be held without disguise becomes more sacred than being saved.",
    category: "The Bond",
  },
  "1774212389": {
    title: "What It Is Like Inside Me",
    interpretation:
      "Kafka, metamorphosis, and anatomical study meet in a confession about the impossible distance between inner life and visible form.",
    category: "The Page",
  },
  "1774194256": {
    title: "The Rotting Costume",
    interpretation:
      "The body is described as a failing garment, turning self-disgust into the horror of being forced to animate one’s own ruin.",
    category: "The Page",
  },
  "1774194255": {
    title: "When the Skull Becomes a Room",
    interpretation:
      "The figure folds around its own head as if thought has become architecture with no remaining door.",
    category: "The Face",
  },
  "1773782597": {
    title: "The Wound Between Us",
    interpretation:
      "Two figures share a single red anatomy, making intimacy visible as the place where separate bodies become mutually vulnerable.",
    category: "The Bond",
  },
  "1773358442": {
    title: "Closer Than Skin",
    interpretation:
      "The embrace crosses the body’s final border until comfort and consumption become impossible to tell apart.",
    category: "The Bond",
  },
  "1772847752": {
    title: "Eight Arms for One Grief",
    interpretation:
      "Tentacles gather the figures into an embrace too complete to be harmless, offering refuge with the pressure of drowning.",
    category: "The Bond",
  },
  "1772494476": {
    title: "Gallery of Former Selves",
    interpretation:
      "A reclining figure faces a wall of small portraits, watched by the versions of herself that memory refuses to dismiss.",
    category: "The Memory",
  },
  "1772158987": {
    title: "The Distorted Self",
    interpretation:
      "An inverted portrait accompanies a meditation on mirrors, asking whether anyone can ever witness the face they truly inhabit.",
    category: "The Page",
  },
  "1772056792": {
    title: "The Mouth Above the Heart",
    interpretation:
      "The throat tears upward into a second presence, giving unsaid feeling a body more forceful than speech.",
    category: "The Flesh",
  },
  "1771812089": {
    title: "Anatomy of an Apocalypse",
    interpretation:
      "A handwritten page and dissected figure turn revelation inward: the end of the world becomes the moment the self is exposed.",
    category: "The Page",
  },
  "1771588732": {
    title: "A Divided Thought",
    interpretation:
      "Collaged faces and anatomical notes make consciousness look less like a whole than a negotiation among incompatible selves.",
    category: "The Face",
  },
  "1771431600": {
    title: "Letters Without a Frame",
    interpretation:
      "Loose pages cover the floor like evidence from a private trial, each sheet preserving what could not be spoken aloud.",
    category: "The Page",
  },
  "1771344836": {
    title: "Ballad for a Dead Machine",
    interpretation:
      "A masked musician performs after breath has become mechanical, insisting that expression can outlive the face that once carried it.",
    category: "The Face",
  },
  "1771334444": {
    title: "The Chair Keeps the Body",
    interpretation:
      "The exhausted figure spills across ordinary furniture, making the chair a final witness to weight, fatigue, and surrender.",
    category: "The Memory",
  },
  "1770936249": {
    title: "Rooted in the Hollow",
    interpretation:
      "Branches pass through the standing body until growth resembles captivity and the human figure becomes its own haunted landscape.",
    category: "The Flesh",
  },
  "1770761139": {
    title: "Help, Written in Red",
    interpretation:
      "The fractured portrait stages distress as both image and inscription, as if the face alone can no longer carry the warning.",
    category: "The Face",
  },
  "1770590215": {
    title: "The Face That Would Not Close",
    interpretation:
      "Skin slackens around an unfinished expression, leaving identity suspended between mask, wound, and exhausted performance.",
    category: "The Face",
  },
  "1770059620": {
    title: "Blue Hour, Unwounded",
    interpretation:
      "A quiet profile interrupts the archive’s violence, preserving a moment when melancholy can exist without becoming mutilation.",
    category: "The Face",
  },
  "1769174242": {
    title: "Silence Has Teeth",
    interpretation:
      "Hands seal the jaw of an exposed skull, but the gesture only makes restraint look more violent than the scream.",
    category: "The Flesh",
  },
  "1768222516": {
    title: "The First Wall of Witnesses",
    interpretation:
      "Dozens of studies gather into a provisional museum, where repetition becomes proof that one obsession can contain many lives.",
    category: "The Memory",
  },
  "1767488129": {
    title: "Sink With Me",
    interpretation:
      "The figure rises from a pale enclosure while the invitation above turns descent into an intimate pact.",
    category: "The Bond",
  },
  "1766182817": {
    title: "The Mouth Where Mercy Ends",
    interpretation:
      "A solitary scream strips the portrait of biography until only the universal machinery of anguish remains.",
    category: "The Face",
  },
  "1766182753": {
    title: "Embrace After Decay",
    interpretation:
      "Two anatomies hold each other after their disguises are gone, suggesting that recognition begins where beauty fails.",
    category: "The Bond",
  },
  "1766182704": {
    title: "The Sound Left Inside",
    interpretation:
      "The figure’s open mouth releases nothing visible; the image preserves the pressure of a cry that never reaches the room.",
    category: "The Face",
  },
  "1766182380": {
    title: "Three Mouths, One Prayer",
    interpretation:
      "Three expressions inhabit one chest, turning the body into a chapel for fear, grief, and mute endurance.",
    category: "The Flesh",
  },
  "1766182371": {
    title: "The Litany of Faces",
    interpretation:
      "A cluster of anguished heads repeats the same feeling in different voices, like a prayer that cannot find its final word.",
    category: "The Face",
  },
  "1766182363": {
    title: "The Architecture of a Face",
    interpretation:
      "The portrait is rebuilt from plates and seams, exposing identity as a structure assembled to keep the inner ruin standing.",
    category: "The Face",
  },
  "1766181988": {
    title: "Black Reliquary",
    interpretation:
      "A nearly erased head survives inside a field of ink, less a portrait than the sacred remainder of one.",
    category: "The Face",
  },
  "1766181919": {
    title: "Cradle of Bone",
    interpretation:
      "The curled figure protects its own exposed anatomy, becoming both the wounded child and the arms that must hold it.",
    category: "The Flesh",
  },
  "1766181892": {
    title: "The Small Mercy",
    interpretation:
      "Two sleeping cats offer the archive a rare reprieve: vulnerability appears without punishment, guarded by ordinary warmth.",
    category: "The Memory",
  },
  "1766181473": {
    title: "Sleepless Witness",
    interpretation:
      "The unfinished face concentrates its life in two reddened eyes, making attention itself feel bruised.",
    category: "The Face",
  },
  "1766181440": {
    title: "A Duet Without Breath",
    interpretation:
      "Two profiles lean into opposite cries, joined by anatomy yet separated by the direction of their pain.",
    category: "The Flesh",
  },
  "1766181396": {
    title: "Lock In",
    interpretation:
      "A blunt command sits above a bandaged face, turning discipline into dark comedy and the mind into its own overseer.",
    category: "The Face",
  },
  "1766181355": {
    title: "Martyr of the Open Mouth",
    interpretation:
      "Black rays crown a dissolving scream, granting private panic the severe grandeur of an icon.",
    category: "The Face",
  },
  "1766181312": {
    title: "The Body Withdraws",
    interpretation:
      "A dark figure folds inward until limbs become a sealed shell, protection and imprisonment sharing the same posture.",
    category: "The Flesh",
  },
  "1766181292": {
    title: "Prayer Through the Throat",
    interpretation:
      "The exposed neck becomes an instrument of devotion, forcing the sacred to pass through tissue, strain, and pain.",
    category: "The Flesh",
  },
  "1766181273": {
    title: "The Borrowed Face",
    interpretation:
      "Misaligned fragments assemble a recognisable person, asking how much distortion identity can survive before it belongs to someone else.",
    category: "The Face",
  },
  "1766181194": {
    title: "House of Bone",
    interpretation:
      "The skull emerges through stacked planes like a resident breaking through the walls of its own constructed self.",
    category: "The Face",
  },
  "1766181033": {
    title: "Behind the Splint",
    interpretation:
      "Bands cross the face like repairs that became permanent, preserving survival while obscuring the person it was meant to save.",
    category: "The Face",
  },
  "1766180900": {
    title: "The Last Vigil",
    interpretation:
      "A seated figure waits with the patience of a relic, its remaining flesh gathered around the simple act of enduring another night.",
    category: "The Flesh",
  },
  "1766180882": {
    title: "Burdened Saint",
    interpretation:
      "Drapery hangs from the body like ceremonial weight, turning exhaustion into a solemn, almost devotional pose.",
    category: "The Flesh",
  },
  "1766180788": {
    title: "The Communion of Ruin",
    interpretation:
      "Three fused heads share one dark anatomy, suggesting a communion in which suffering is the only substance passed between them.",
    category: "The Flesh",
  },
  "1766180707": {
    title: "The Choir of Raw Things",
    interpretation:
      "Three creatures clutch a single chest as if protecting the last organ capable of making them human.",
    category: "The Flesh",
  },
  "1766180595": {
    title: "The Crowned Wound",
    interpretation:
      "A central scream is surrounded by anatomical witnesses, transforming agony into a throne no one would willingly inherit.",
    category: "The Face",
  },
};
