import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { CSSProperties } from 'react';
import { UrlObject } from 'url';
import UtilService from '../../service/UtilService';
import Link from 'next/link';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';
import Image from 'next/image';

const DEFAULT_CAVER_IMAGE = '/assets/img/symbol-logo-default-cover.png';

interface Args {
  image?: string;
  title: string;
  description: string;
  date?: string;
  style?: CSSProperties;
  link?: UrlObject;
  tweetLink?: string;
}

export default function MediaCard(props: Args): JSX.Element {
  const theme = useTheme();
  const router = useRouter();

  // tweet 投稿用URLを生成する
  const createShareLink = () => {
    const tweetUrl = 'https://twitter.com/intent/tweet?text=';
    const title = encodeURIComponent(props.title);
    const url = encodeURIComponent(props.tweetLink || '');
    const tags = encodeURIComponent('#Symbol #NEM #Blockchain');
    return `${tweetUrl}${title}%0A${url}%0A${tags}`;
  };

  return (
    <Card style={{ display: "flex", flexDirection: "column", ...props.style }}>
      <CardMedia
        component={'img'}
        height="200"
        alt="symbol シンボル nem card content image"
        image={props.image || `${router.basePath}${DEFAULT_CAVER_IMAGE}`}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.title}
        </Typography>
        {props.date && (
          <Typography variant="body2" color="text.secondary" align="left" gutterBottom>
            {UtilService.formatDate(new Date(props.date), 'yyyy/MM/dd')}
          </Typography>
        )}
        <Divider />
        <div style={{ height: '1rem' }} />
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {props.description.slice(0, 80) + (props.description.length >= 80 ? "..." : "")}
        </Typography>
      </CardContent>
      <CardContent style={{ gap: '1rem', display: "flex", flexDirection: "row", marginTop: "auto" }}>
        <Link href={props.link === undefined ? '/' : props.link}>
          <a style={{ textDecoration: 'none', color: theme.palette.primary.main }}>View</a>
        </Link>
        <Link rel="noopener noreferrer" target="_blank" href={createShareLink()}>
          <a
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none', color: theme.palette.primary.main }}
          >
            Share
          </a>
        </Link>
      </CardContent>
    </Card>
  );
}
