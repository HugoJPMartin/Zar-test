import makeStyles from '@material-ui/core/styles/makeStyles';
import React from 'react';
import { useResource } from '../../1_hooks/resource.provider';
import { Card, Typography } from '../../common/core/components';
import {Client, getRoleName, getTierName, isChampionIdValid, isRoleValid} from '../../common/league';
import {Role} from "../../common/league/client";

// https://v4.mui.com/styles/api/#examples-2
const useStyles = makeStyles(theme => ({
    root: {

    },
    cell:{
        "float": "left",
        "vertical-align":"top",
        "margin":"5px",
        "font-size":"14px"
    },
    "winrate-positive":{
        "font-weight":"bold",
        color:theme.palette.primary.main
    },
    "winrate-negative":{
        "font-weight":"bold",
        color:theme.palette.text.primary
    },
    image:{
        width:"65px",
        height:"65px"
    },
    rank:{
        color:"white",
        "font-size":"0.8rem"
    },
    games:{
        "font-size":"0.8rem"
    },
    reducedLines:{
        "line-height":"1",
        "font-size":"12px"
    }
}));

export interface Profile {
    gamesPlayed: number;
    winrate: number;
    kda: number;
}

export interface DraftSummonerProfile {
    summonerName: string;
    gamesPlayed?: number;
    winrate?: number;

    tier?: Client.Tier;
    division?: Client.Division;

    role?: Client.Role;
    roleProfile?: Profile;

    championId?: Client.ChampionId;
    championProfile?: Profile;
}

export interface DraftSummonerProfileProps {
    profile: DraftSummonerProfile;
}

// TODO: Implement this component based on the Figma design. You should use the provided components: Card and Typography.
//       https://www.figma.com/file/0OzXZgcefj9s8aTHnACJld/Junior-React-Takehome?node-id=42%3A43
// Notes:
// - It has multiple states, each are represented as separate story in storybook
// - If winrate is >= 50, it's positive and displayed in our primary color
// - If gamesPlayed is > 0, the profile contains data

export const DraftSummonerProfile: React.FC<DraftSummonerProfileProps> = ({
    profile: {
        summonerName,
        winrate,
        gamesPlayed,

        tier,
        division,

        role,
        roleProfile,

        championId,
        championProfile
    }
}) => {
    const classes = useStyles();

    const {
        getChampionName,
        getChampionImage,
        getRoleName,
        getTierDivisionName
    } = useResource();

    const hasRole = isRoleValid(role);
    const hasChampion = isChampionIdValid(championId);
    const isThereData = !(winrate === undefined);
    const isThereRoleData = !(roleProfile === undefined);
    const isThereChampionData = !(championProfile === undefined);


    return (
        <Card elevation='1' p={1} style={{"margin":"5px"}}>
            <Typography
                variant='textMain' paragraph
                color='textSecondary'
                mt={.5} mb={2.5}
            >
                {/* Champion image cell */}
                <div class={classes.cell}>
                    {hasChampion && <img class={classes.image} src={getChampionImage(championId)} />}
                    {/* Need to find a placeholder */}
                    {!hasChampion && <img class={classes.image} src={getChampionImage(championId)} />}
                </div>

                {/* Summoner info cell */}
                <div class={classes.cell}>
                    {summonerName}
                    <br />
                    {!isThereData && "no data"}
                    {isThereData && <div className={classes.reducedLines}>
                        <span class={winrate > 50 ? classes["winrate-positive"]:classes["winrate-negative"]}> {winrate.toFixed(1) + "% wr"}</span>
                        <br/>
                        <span className={classes.rank}> {getTierName(tier) + " " + division}</span>
                        <br/>
                        <span className={classes.games}> {gamesPlayed + " games"}</span>
                    </div>}
                </div>

                {/* Role info cell */}
                {/* Requires role data and lack of champion data */}
                {!hasChampion && hasRole && <div class={classes.cell}>
                    as {getRoleName(role)}
                    <br />
                    {!isThereRoleData && "no data"}
                    {isThereRoleData && <div className={classes.reducedLines}>
                        <span className={roleProfile.winrate > 50 ? classes["winrate-positive"] : classes["winrate-negative"]}> {roleProfile.winrate.toFixed(1) + "% wr"}</span>
                        <br/>
                        <span className={classes.rank}> {roleProfile.kda.toFixed(1) + " kda"}</span>
                        <br/>
                        <span className={classes.games}> {roleProfile.gamesPlayed + " games"}</span>
                    </div>}
                </div>}

                {/* Champion info cell */}
                {/* Requires champion data */}
                {hasChampion && <div class={classes.cell}>
                    on {getChampionName(championId)}
                    <br />
                    {!isThereChampionData && "no data"}
                    {isThereChampionData && <div className={classes.reducedLines}>
                        <span className={championProfile.winrate > 50 ? classes["winrate-positive"] : classes["winrate-negative"]}> {championProfile.winrate.toFixed(1) + "% wr"}</span>
                        <br/>
                        <span className={classes.rank}> {championProfile.kda.toFixed(1) + " kda"}</span>
                        <br/>
                        <span className={classes.games}> {championProfile.gamesPlayed + " games"}</span>
                    </div>}
                </div>}
            </Typography>
        </Card>
    );
}